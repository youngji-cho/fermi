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
        return({'startdate':datetime.date.today(),'year':15,'type':'month','size':99,'weight':1.5,'average_time':3.4})
    if sys.stdin.isatty()== False:
        lines=sys.stdin.readlines()
        parsed=json.loads(lines[0])
        return(parsed)

params=read_in()
params["size"]=int(params["size"]);params["year"]=int(params["year"]);params["weight"]=int(params["weight"]);params["average_time"]=int(params["average_time"]);
cost=cost.total_cost_calc(params)
revenue=pr.lm_pred
revenue['rec_price']=100
revenue['smp_revenue']=revenue['smp_price']*30*params['weight']*params['size']*params['average_time']
revenue['rec_revenue']=revenue['rec_price']*30*params['weight']*params['size']*params['average_time']
revenue.index=[pd.period_range(start=revenue.index[0],periods=revenue.shape[0],freq="m")]
result=pd.concat([revenue,cost],axis=1,join="outer")

if __name__ == '__main__':
    print(result.to_json(orient='records',date_format="iso"))
