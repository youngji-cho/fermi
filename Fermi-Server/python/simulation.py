import pymysql
import numpy as np
import pandas as pd

conn =pymysql.connect(
    host= "fermi-master.c4kp2nxu0eer.ap-northeast-2.rds.amazonaws.com",
    user= "admin",
    password="fermi1234",
    db='energy_data2',
    charset='utf8'
)
curs=conn.cursor()
sql="select date,total_price from smp_price1"
curs.execute(sql)
data=pd.DataFrame(np.array(curs.fetchall()))
#data_pd=pd.DataFrame(curs.fecthall())
print(data)
