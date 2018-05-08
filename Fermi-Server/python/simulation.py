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
import cost

def read_in():
    if sys.stdin.isatty()== True:
        return({'startdate':'2018-05-10','year':10,'size':99.5,'weight':1.5,'averagetime':3.4,"scene":"lm_model","type":"month"})
    if sys.stdin.isatty()== False:
        lines=sys.stdin.readlines()
        parsed=json.loads(lines[0])
        return(parsed)

params=read_in()
params['year']=int(params['year']);params['size']=float(params['size']);params['weight']=float(params['weight']);params['averagetime']=float(params['averagetime']);

index_month=pd.period_range(start=params["startdate"],periods=params["year"]*12+1,freq="m")
index_quarter=pd.period_range(start=params["startdate"],periods=params["year"]*4+1,freq="q")
index_year=pd.period_range(start=params["startdate"],periods=params["year"]+1,freq="y")

#초기 예측치 만들기
cost=cost.total_cost_calc(params)
revenue=pr.predict(params['scene'],params['startdate'],params['year'])
revenue.index=index_month;
revenue['days']=revenue.index.day
revenue['rec_price']=100
revenue['smp_revenue']=revenue['smp_price']*30*params['weight']*params['size']*params['averagetime']
revenue['rec_revenue']=revenue['rec_price']*30*params['weight']*params['size']*params['averagetime']
revenue.index=index_month
result=pd.concat([revenue,cost],axis=1)

start=pd.to_datetime(params["startdate"], format='%Y-%m-%d', errors='ignore')#초기 기간 설정
startday=start.date().timetuple()

result.days[0]=result.days[0]-startday.tm_mday
result.days[result.shape[0]-1]=startday.tm_mday
result["date"]=index_month
result["smp_revenue"]=result["smp_revenue"].astype(int)
result["rec_revenue"]=result["rec_revenue"].astype(int)

#가격 만들기
price_forecast=result.loc[:,['smp_price','rec_price']]
price_forecast.index=index_month
price_forecast['date']=index_month

#월,분기,년별로 만들기
result_sample=result.drop(['rec_price','smp_price'],axis=1)
#월간 표
result_month=result_sample
result_month.index=index_month
result_month['date']=index_month

#분기 표
def toQuarter(data):
    quarter= []
    for i in range(0,data.index.size):
        quarter.append(str(data.index.year[i])+'-'+str(data.index.quarter[i]))
    return quarter
result_quarter=result_sample
result_quarter.index=index_month
result_quarter.index=toQuarter(result_quarter)
result_quarter=result_quarter.groupby(result_quarter.index).sum()
result_quarter.index=index_quarter
result_quarter['date']=index_quarter

#연간 가격
result_year=result_sample
result_year.index=index_month
result_year.index=result_year.index.year
result_year=result_year.groupby(result_year.index).sum()
result_year.index=index_year
result_year['date']=index_year

final_result={
    "price_forecast":json.loads(price_forecast.to_json(orient='records',date_format="iso")),
    "result_month":json.loads(result.to_json(orient='records',date_format="iso")),
    "result_quarter":json.loads(result_quarter.to_json(orient='records',date_format="iso")),
    "result_year":json.loads(result_year.to_json(orient='records',date_format="iso"))
}

if __name__ == '__main__':
    print(json.dumps(final_result))
