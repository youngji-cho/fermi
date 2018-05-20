# -*- coding: utf-8 -*-
import sys
import os
import json
import datetime
import numpy as np
import pandas as pd
import pymysql
import statsmodels.api as sm
import statsmodels.formula.api as smf
import predictions as pr
import finance as fr
import cost

initial_params={'year':25,'size':99.5,'weight':1.5,'average_time':3.4,"plant":"solar",'startdate':'2018-10-10',
"construction":150000000,"investment":180000000,"othercost":25000000,"debt":120000000,"equity":60000000,"interest":0.05,"unredeemed":100000,"duration":12,"repayment_method":"cpm","repayment_term":"m","interest_repayment_term":"q","finance_startdate":"2018-06-13",'scene':'lm_model',"price_index":0.01,"solar_index":-0.08 }

def read_in():
    if sys.stdin.isatty()== True:
        return(initial_params)
    if sys.stdin.isatty()== False:
        lines=sys.stdin.readlines()
        parsed=json.loads(lines[0])
        return(parsed)

params=read_in()

#물가 예상
price_index=pr.index_predict(params["startdate"],params["year"],params["price_index"]);price_index.name="price_index";
solar_index=pr.index_predict(params["startdate"],params["year"],params["solar_index"]);solar_index.name="solar_index";

#수입예상 및 전체적인 지표구성
revenue=pr.predict(params["scene"],params["startdate"],params["year"])
revenue["rec_price"]=100;
revenue["days"]=revenue.index.day
start=pd.to_datetime(params["startdate"], format='%Y-%m-%d', errors='ignore')#초기 기간 설정
startday=start.date().timetuple()
revenue.days[0]=revenue.days[0]-startday.tm_mday
revenue.days[revenue.shape[0]-1]=startday.tm_mday

revenue=pd.concat([revenue,price_index,solar_index],axis=1)
revenue["generation"]=revenue['days']*params['size']*params['average_time']*revenue["solar_index"]
revenue['smp_revenue']=revenue['smp_price']*revenue['generation']
revenue['rec_revenue']=revenue['rec_price']*revenue['generation']*params['weight']
revenue["smp_revenue"]=revenue["smp_revenue"].astype(int); revenue["rec_revenue"]=revenue["rec_revenue"].astype(int)

#지출예상
OM_cost=cost.OM_calc(params["startdate"],params["size"],params["year"])
monitoring_cost=cost.monitoring_cost_calc(params["startdate"],params["size"],params["year"])
elec_safety_cost=cost.elec_safety_calc(params["startdate"],params["size"],params["year"])
office_cost=cost.office_cost_calc(params["startdate"],params["size"],params["year"])
other_cost=cost.other_cost_calc(params["startdate"],params["size"],params["year"])
total_cost=pd.concat([OM_cost,monitoring_cost,elec_safety_cost,office_cost,other_cost],axis=1)
cost=pd.concat([total_cost,price_index],axis=1)

cost["OM_cost"]=cost["OM_cost"]*cost["price_index"]
cost["monitoring_cost"]=cost["monitoring_cost"]*cost["price_index"]
cost["elec_safety_cost"]=cost["elec_safety_cost"]*cost["price_index"]
cost["office_cost"]=cost["office_cost"]*cost["price_index"]
cost["other_cost"]=cost["other_cost"]*cost["price_index"]
cost["depreciation"]=params["construction"]/(params["duration"]*12)

#금융구조 예상
if(params["repayment_method"]=="cam"):
    amortization=fr.CAM_calc(params["finance_startdate"],params["duration"],params["debt"],params["interest"],params["repayment_term"],params["interest_repayment_term"])
elif(params["repayment_method"]=="cpm"):
    amortization=fr.CPM_calc(params["finance_startdate"],params["duration"],params["debt"],params["interest"],params["repayment_term"])
amortization.index=amortization.index.shift(n=1,freq="m")
result=pd.concat([revenue,cost,amortization],axis=1)

#전체적인 구조 도출
result=result.loc[:,['smp_revenue','rec_revenue','OM_cost','monitoring_cost','elec_safety_cost','office_cost','other_cost','depreciation','interest','principal']]
result=result.fillna(0)
def money_trim(array):
    result=round(array,-1)
    result=result.astype(int)
    return result
result=result.apply(money_trim)
result['date']=result.index

#쿼터로 만들기
result_quarter=result.copy()
result_quarter.index=result_quarter.index.to_period("q")
result_quarter=result_quarter.groupby(result_quarter.index).sum()
result_quarter.index=pd.date_range(start=result_quarter.index.to_timestamp()[0],periods=result_quarter.shape[0],freq="q")
result_quarter['date']=result_quarter.index

#연단위 로 만들기
result_year=result.copy()
result_year.index=result_year.index.to_period("y")
result_year=result_year.groupby(result_year.index).sum()
result_year.index=pd.date_range(start=result_year.index.to_timestamp()[0],periods=result_year.shape[0],freq="y")
result_year['date']=result_year.index

#손익계산서 만들기
def makeIncomeState(income_state):
    income_state["gross_income"]=income_state["smp_revenue"]+income_state["rec_revenue"]
    income_state["operating_expense"]=income_state["OM_cost"]+income_state["monitoring_cost"]+income_state["elec_safety_cost"]+income_state["office_cost"]+income_state["other_cost"]+income_state["depreciation"]
    income_state["operating_income"]=income_state["gross_income"]-income_state["operating_expense"]
    income_state["pretax_net_income"]=income_state["operating_income"]-income_state["interest"]
    def tax(x):
        if x>0:
            return x*0.1
        else:
            return 0
    income_state["tax"]=income_state.pretax_net_income.apply(tax)
    income_state["net_income"]=income_state["pretax_net_income"]-income_state["tax"]
    income_state=income_state.loc[:,["date","smp_revenue","rec_revenue","gross_income",'OM_cost',"monitoring_cost","elec_safety_cost","office_cost","other_cost","depreciation","operating_expense","operating_income","interest","pretax_net_income","tax","net_income"]]
    return income_state

income_month=makeIncomeState(result.copy())
income_quarter=makeIncomeState(result_quarter.copy())
income_year=makeIncomeState(result_year.copy())

#현금흐름표 만들기
def makeCashFlow(cash_flow,tax,construction,principal,equity):
    cash_flow=pd.merge(cash_flow,tax.to_frame(),how='left',left_index=True,right_index=True)
    cash_flow=cash_flow.fillna(0)
    cash_flow["operation_cash_in"]=cash_flow["smp_revenue"]+cash_flow["rec_revenue"];
    cash_flow["operation_cash_out"]=cash_flow["OM_cost"]+cash_flow["monitoring_cost"]+cash_flow["elec_safety_cost"]+cash_flow["office_cost"]+cash_flow["other_cost"]+cash_flow["interest"]+cash_flow["tax"]
    cash_flow["operation_cash"]=cash_flow["operation_cash_in"]-cash_flow["operation_cash_out"]
    cash_flow["finance_cash_in"]=0
    cash_flow["acqusition_asset"]=0;cash_flow["acqusition_asset"][0]=construction
    cash_flow["finance_cash_out"]=cash_flow["acqusition_asset"]
    cash_flow["finance_cash"]=cash_flow["finance_cash_in"]-cash_flow["finance_cash_out"]
    cash_flow["debt"]=0; cash_flow["debt"][0]=principal
    cash_flow["equity"]=0; cash_flow["equity"][0]=equity
    cash_flow["investment_cash_in"]=cash_flow["debt"]+cash_flow["equity"]
    cash_flow["investment_cash_out"]=cash_flow["principal"]
    cash_flow["investment_cash"]=cash_flow["investment_cash_in"]-cash_flow["investment_cash_out"]
    cash_flow["start_cash"]=0;cash_flow["end_cash"]=0;
    cash_flow["cash_change"]=cash_flow["operation_cash"]+cash_flow["finance_cash"]+cash_flow["investment_cash"]
    for i in range(0,cash_flow.shape[0]-1):
        cash_flow["end_cash"][i]=cash_flow["start_cash"][i]+cash_flow["cash_change"][i];
        cash_flow["start_cash"][i+1]=cash_flow["end_cash"][i];
    cash_flow["end_cash"][cash_flow.shape[0]-1]=cash_flow["start_cash"][cash_flow.shape[0]-1]+cash_flow["cash_change"][cash_flow.shape[0]-1]
    cash_flow=cash_flow.loc[:,["date",'operation_cash','smp_revenue','rec_revenue','operation_cash_in','OM_cost','monitoring_cost','elec_safety_cost', 'office_cost', 'other_cost', 'depreciation',
       'interest','tax', 'operation_cash_out','finance_cash','finance_cash_in',
       'acqusition_asset','finance_cash_out','debt','equity','investment_cash','investment_cash_in','principal','investment_cash_out','cash_change','start_cash','end_cash']]
    return cash_flow

cashflow_month=makeCashFlow(result.copy(),income_year['tax'],params['construction'],params['debt'],params['equity'])
cashflow_quarter=makeCashFlow(result_quarter.copy(),income_year['tax'],params['construction'],params['debt'],params['equity'])
cashflow_year=makeCashFlow(result_year.copy(),income_year['tax'],params['construction'],params['debt'],params['equity'])

final_result={
    "income_month":json.loads(income_month.to_json(orient='records',date_format="iso")),
    "income_quarter":json.loads(income_quarter.to_json(orient='records',date_format="iso")),
    "income_year":json.loads(income_year.to_json(orient='records',date_format="iso")),
    "cashflow_month":json.loads(cashflow_month.to_json(orient='records',date_format="iso")),
    "cashflow_quarter":json.loads(cashflow_quarter.to_json(orient='records',date_format="iso")),
    "cashflow_year":json.loads(cashflow_year.to_json(orient='records',date_format="iso")),
}

if __name__ == '__main__':
    print(json.dumps(final_result))
