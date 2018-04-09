import pymysql
import sys
import numpy as np
import pandas as pd
import json
import os
import statsmodels.api as sm
import statsmodels.formula.api as smf
import datetime

config_path=os.path.abspath(os.path.join(__file__ ,"../../.."))
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
data['date']= data.index

data=data.astype(float)

# 회귀분석 모델 만들기
model=smf.ols(formula = 'smp_price~oil_price+elec_supply', data = data).fit()

def make_scenario(year,scenario):
    curs=conn.cursor()
    fields_sql="SHOW FIELDS FROM `oil_forecast`"
    curs.execute(fields_sql)
    fields=[]
    fields_result=curs.fetchall()
    for i in fields_result:
        fields.append(i[0])
    time=pd.period_range(start=datetime.date.today().strftime("%Y-%m-%d"),periods=12*15,freq='M')
    startDate=str(time[0])
    endDate=str(time[len(time)-1])
    main_sql ="SELECT * FROM `oil_forecast` where date>=%s && date<=%s"
    curs=conn.cursor()
    curs.execute(main_sql,(startDate+'-01',endDate+'-01'))
    result=pd.DataFrame(data=np.array(curs.fetchall()),index=time,columns=fields).loc[:,scenario]
    return result


def main(input):
    export_data=input.to_json(orient='records',date_format="iso")
    print(export_data)

if __name__ == '__main__':
    main(data)
