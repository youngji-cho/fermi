# -*- coding: utf-8 -*-
import sys
import os
import json
from datetime import datetime
module_config =os.path.abspath(os.path.join(__file__ ,"../../../lib/python3.6/site-packages"))
config_path=os.path.abspath(os.path.join(__file__ ,"../../.."))
sys.path.append(module_config)
## 아마존 EC2에 올라 갔을때 모듈 위치를 제대로 못잡을수 있으니 아래와 같은 조치를 함.
import numpy as np
import pandas as pd
import pymysql
import statsmodels.api as sm
import statsmodels.formula.api as smf

config=json.load(open(os.path.join(config_path,'config.json')))
conn =pymysql.connect(
    host=config['energy_data']['host'],
    user=config['energy_data']['user'],
    password=config['energy_data']['password'],
    db=config['energy_data']['database'],
    charset='utf8'
)
params={'startdate':'2018-05-10','year':15,'size':99.5,'weight':1.5,'averagetime':3.4,"scene":"lm_model","type":"month","plant":"solar","contruction":150000000,"investment":180000000,"othercost":25000000,"debt":120000000,"interest":0.05,"unredeemed":12321321123,"duration":12,"repayment_method":"cpm","repayment_term":"m"}
curs=conn.cursor()
sql="""
select smp_price.date, smp_price.total_price as smp_price, oil_price.wti,elec_supply.supply,price_index.korea_producer, price_index.us_producer from smp_price
    inner join oil_price
		on smp_price.date=oil_price.date
	inner join elec_supply
		on smp_price.date=elec_supply.date
	inner join price_index
		on smp_price.date=price_index.date
        """
curs.execute(sql)
array=np.array(curs.fetchall())
curs.close()
data=pd.DataFrame(data=array[:,1:6],index=array[:,0],columns=["smp_price","oil_price","elec_supply","korea_producer","us_producer"])
data.smp_price=data.smp_price*data.korea_producer
data.oil_price=data.oil_price*data.us_producer
data=data.astype(float)
lm_model=smf.ols(formula = 'smp_price~oil_price+elec_supply', data = data).fit()

# 회귀분석 모델 만들기
def find_fields(tables):
    sql="SELECT * FROM information_schema.columns WHERE Table_Name=%s"
    for i in range(1,len(tables)):
        sql +=" OR Table_Name=%s"
    curs=conn.cursor()
    curs.execute(sql,tables)
    fields=[]
    fields_result=curs.fetchall()
    for i in fields_result:
        fields.append(i[3])
    return fields

def fetch_forecast(scenes,startdate,year):
    fields=find_fields(['elec_forecast'])
    sql="select * from energy_data.elec_forecast"
    curs=conn.cursor()
    curs.execute(sql)
    result=pd.DataFrame(data=np.array(curs.fetchall()),columns=fields)
    result.index=pd.date_range(start=result.date[0],periods=result.shape[0],freq="m")
    result=result.loc[:,scenes]
    start=datetime.strptime(startdate,'%Y-%m-%d')
    result=result.loc[result.index>=start,:]
    final_result=result.iloc[0:year*12+1]
    final_result=final_result.astype(float)
    return(final_result)

def make_scenario(model,forecast):
    pred=model.predict(forecast)
    output=pd.DataFrame({'smp_price':pred})
    output=output.astype(int)
    return(output)

def predict(model,startdate,year):
    if model=="lm_model":
        forecast=fetch_forecast(["WEO_450","supply7"],startdate,year)
        forecast=forecast.rename(columns={"WEO_450":"oil_price","supply7":"elec_supply"})
        pred_model=make_scenario(lm_model,forecast)
        return pred_model
    else:
        return 'error'

def index_predict(startdate,year,index):
    data=pd.Series(index=pd.date_range(start=startdate,periods=year*12+1,freq="m"))
    for i in range(0,year):
        data[::12][i]=(1+index)**i
    data=data.interpolate()
    return data

if __name__ == '__main__':
    result=predict(params['scene'],params['startdate'],params['year'])
    print(result)
