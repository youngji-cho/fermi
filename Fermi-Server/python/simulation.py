import pymysql
import sys
import numpy as np
import pandas as pd
import json
import os

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

def main(input):
    export_data=input.to_json(orient='records',date_format="iso")
    print(export_data)

if __name__ == '__main__':
    main(data)
