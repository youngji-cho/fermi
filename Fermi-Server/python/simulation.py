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
        return({'startdate':'2018-05-01','year':15,'size':99.5,'weight':1.5,'averagetime':3.4,"scenario":"lm_model","type":"month"})
    if sys.stdin.isatty()== False:
        lines=sys.stdin.readlines()
        parsed=json.loads(lines[0])
        return(parsed)

params=read_in()
params['year']=int(params['year']);params['size']=float(params['size']);params['weight']=float(params['weight']);params['averagetime']=float(params['averagetime']);
cost=cost.total_cost_calc(params)
revenue=pr.predict(params['scenario'],params['startdate'],params['year'])
revenue['rec_price']=100
revenue['smp_revenue']=revenue['smp_price']*30*params['weight']*params['size']*params['averagetime']
revenue['rec_revenue']=revenue['rec_price']*30*params['weight']*params['size']*params['averagetime']
revenue.index=pd.period_range(start=revenue.index[0],periods=revenue.shape[0],freq="m")
result=pd.concat([revenue,cost],axis=1)
result["date"]=result.index

if __name__ == '__main__':
    print(result.to_json(orient='records',date_format="iso"))
