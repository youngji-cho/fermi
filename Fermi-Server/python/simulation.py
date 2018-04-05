import pymysql
import sys
import numpy as np
import pandas as pd
import json

conn =pymysql.connect(
    host= "fermi-master.c4kp2nxu0eer.ap-northeast-2.rds.amazonaws.com",
    user= "admin",
    password="fermi1234",
    db='energy_data2',
    charset='utf8'
)
curs=conn.cursor()
sql="""
select smp_price1.date, smp_price1.total_price as smp_price, oil_price.wti,elec_supply.supply,price_index.korea_producer, price_index.us_producer from smp_price1
    inner join oil_price
		on smp_price1.date=oil_price.date
	inner join elec_supply
		on smp_price1.date=elec_supply.date
	inner join price_index
		on smp_price1.date=price_index.date
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

'''
def read_in():
    lines =sys.stdin.readlines()
    print(json.loads(lines[0]))

def main():
    lines =read_in()
    np_lines=np.array(lines)
    lines_sum=np.sum(np_lines)
    return(lines_sum)
'''
