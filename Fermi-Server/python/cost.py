# -*- coding: utf-8 -*-
import sys
import os
import json
from datetime import datetime
import pandas as pd

params={'startdate':'2018-10-10','year':25,'size':99.5,'weight':1.5,'averagetime':3.4,
        "scene":"lm_model","type":"month","plant":"solar",
        "contruction":150000000,"investment":180000000,"othercost":25000000,
        "principal":120000000,"interest":0.05, "unredeemed":12321321123,"duration":12,
        "repayment_method":"cpm","repayment_term":"m","interest_repayment_term":"q",
        "finance_startdate":"2018-06-13","price_index":0.01,"solar_index":-0.08}

#장비 수리비
def OM_calc(startdate,size,year):
    start=datetime.strptime(startdate,'%Y-%m-%d')
    index=pd.date_range(start=start,periods=year*12+1,freq="m")
    if(size<=100):
        cost=12500*size/12
    elif(size>100):
        cost=10000*size/12
    else:
        table="error"
    table=pd.Series(index=index,data=cost,name="OM_cost")
    return table

#회계기장비
def monitoring_cost_calc(startdate,size,year):
    start=datetime.strptime(startdate,'%Y-%m-%d')
    index=pd.date_range(start=start,periods=year*12+1,freq="m")
    if size<100:
        cost=104000
    elif 10000<=size<15000:
        cost=350000
    table=pd.Series(index=index,data=cost,name="monitoring_cost")
    return table

#전기 안전관리가 선임비
def elec_safety_calc(startdate,size,year):
    start=datetime.strptime(startdate,'%Y-%m-%d')
    index=pd.date_range(start=start,periods=year*12+1,freq="m")
    if size<100:
        cost=1200000/12
    elif 100<=size<300:
        cost=1680000/12
    elif 300<=size<500:
        cost=3000000/12
    elif 500<=size<700:
        cost=6240000/12
    elif 700<=size<1000:
        cost=12840000/12
    elif 1000<=size:
        data=24000000/12
    else:
        table="error"
    table=pd.Series(index=index,data=cost,name="elec_safety_cost")
    return table

#회계기장비
def office_cost_calc(startdate,size,year):
    start=datetime.strptime(startdate,'%Y-%m-%d')
    index=pd.date_range(start=start,periods=year*12+1,freq="m")
    if size<100:
        cost=600000/12
    elif 100<=size<10000:
        cost=1200000/12
    elif 10000<=size<15000:
        cost=2400000/12
    table=pd.Series(index=index,data=cost,name="office_cost")
    return table

#기타관리운영비 계산
def other_cost_calc(startdate,size,year):
    start=datetime.strptime(startdate,'%Y-%m-%d')
    index=pd.date_range(start=start,periods=year*12+1,freq="m")
    if size<100:
        cost=230*size
    elif 100<=size<300:
        cost=270*size
    elif 300<=size<500:
        cost=420*size
    elif 500<=size<700:
        cost=662.5*size
    elif 700<=size<1000:
        cost=750*size
    elif 1000<=size<2000:
        cost=800*size
    elif 2000<=size<3000:
        cost=900*size
    elif 3000<=size<5000:
        cost=900*size
    elif 5000<=size<10000:
        cost=900*size
    elif 10000<=size<15000:
        cost=900*size
    elif 15000<=size<20000:
        cost=900*size
    elif 20000<=size<25000:
        cost=900*size
    elif 25000<=size:
        cost=900*size
    else:
        unitcost= "error"
    table=pd.Series(index=index,data=cost,name="other_cost")
    return table

OM_cost=OM_calc(params["startdate"],params["size"],params["year"])
monitoring_cost=monitoring_cost_calc(params["startdate"],params["size"],params["year"])
elec_safety_cost=elec_safety_calc(params["startdate"],params["size"],params["year"])
office_cost=office_cost_calc(params["startdate"],params["size"],params["year"])
other_cost=other_cost_calc(params["startdate"],params["size"],params["year"])
pd.concat([OM_cost,monitoring_cost,elec_safety_cost,office_cost,elec_safety_cost,office_cost,other_cost],axis=1)

def read_in():
    if sys.stdin.isatty()== True:
        return({'startdate':'2018-10-10','year':25,'size':99.5,'weight':1.5,'averagetime':3.4,
                "scene":"lm_model","type":"month","plant":"solar",
                "contruction":150000000,"investment":180000000,"othercost":25000000,
                "principal":120000000,"interest":0.05, "unredeemed":12321321123,"duration":12,
                "repayment_method":"cpm","repayment_term":"m","interest_repayment_term":"q",
                "finance_startdate":"2018-06-13","price_index":0.01,"solar_index":-0.08})
    if sys.stdin.isatty()== False:
        lines=sys.stdin.readlines()
        parsed=json.loads(lines[0])
        return(parsed)

if __name__ == '__main__':
    params=read_in()
    OM_cost=OM_calc(params["startdate"],params["size"],params["year"])
    monitoring_cost=monitoring_cost_calc(params["startdate"],params["size"],params["year"])
    elec_safety_cost=elec_safety_calc(params["startdate"],params["size"],params["year"])
    office_cost=office_cost_calc(params["startdate"],params["size"],params["year"])
    other_cost=other_cost_calc(params["startdate"],params["size"],params["year"])
    total_cost=pd.concat([OM_cost,monitoring_cost,elec_safety_cost,office_cost,elec_safety_cost,office_cost,other_cost],axis=1)
    print(total_cost)
