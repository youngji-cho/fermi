# -*- coding: utf-8 -*-
import sys
import os
import json
import datetime
import numpy as np
import pandas as pd
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
print(type(params["average_time"]),type(params["interest"]))
print(params)
