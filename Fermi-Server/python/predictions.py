# -*- coding: utf-8 -*-
import sys
import os
import json
import datetime
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
    sql="select * from energy_data.elec_forecast where date >=%s"
    curs=conn.cursor()
    curs.execute(sql,startdate)
    result=pd.DataFrame(data=np.array(curs.fetchall()),columns=fields)
    result.index=result.date
    result=result.loc[:,scenes]
    final_result=result.iloc[0:year*12]
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

if __name__ == '__main__':
    result=predict("lm_model","2020-06-01",10)
    print(result)
