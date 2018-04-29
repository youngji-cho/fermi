# -*- coding: utf-8 -*-
import sys
import os
import json
import datetime
import pandas as pd
#장비 수리비
def machine_cost_calc(data):
    if data['type']=='quarter':
        index=pd.period_range(start=data['startdate'],periods=data['year']*4,freq="q")
    elif data['type']=='month':
        index=pd.period_range(start=data['startdate'],periods=data['year']*12,freq="m")
    else:
        index="error"
    table=pd.Series(index=[index], data=1*data["size"],name="machine_cost")
    table=table.astype(int)
    return table
#모니터링 비용
def monitoring_cost_calc(data):
    if data['type']=='quarter':
        index=pd.period_range(start=data['startdate'],periods=data['year']*4,freq="q")
    elif data['type']=='month':
        index=pd.period_range(start=data['startdate'],periods=data['year']*12,freq="m")
    else:
        index="error"
    table=pd.Series(index=[index], data=6*data["size"],name="monitoring_cost")
    table=table.astype(int)
    return table
#보험료 계산
def insurance_cost_calc(data):
    if data['type']=='quarter':
        index=pd.period_range(start=data['startdate'],periods=data['year']*4,freq="q")
    elif data['type']=='month':
        index=pd.period_range(start=data['startdate'],periods=data['year']*12,freq="m")
    else:
        index="error"
    table=pd.Series(index=[index], data=6*data["size"],name="insurance_cost")
    table=table.astype(int)
    return table
#보험료 계산
def reserve_cost_calc(data):
    if data['type']=='quarter':
        index=pd.period_range(start=data['startdate'],periods=data['year']*4,freq="q")
    elif data['type']=='month':
        index=pd.period_range(start=data['startdate'],periods=data['year']*12,freq="m")
    else:
        index="error"
    table=pd.Series(index=[index], data=3*data["size"], name="reserve_cost")
    table=table.astype(int)
    return table
#전기안전관리자
def elec_safety_cost_calc(data):
    if data['size']<100:
        unitcost=1200
    elif 100<=data['size']<300:
        unitcost= 1680
    elif 300<=data['size']<500:
        unitcost= 3000
    elif 500<=data['size']<700:
        unitcost= 6240
    elif 700<=data['size']<1000:
        unitcost= 12840
    elif 1000<=data['size']<2000:
        unitcost= 17000
    elif 2000<=data['size']:
        unitcost= 23000
    else:
        unitcost= "error"
    if data['type']=='quarter':
        index=pd.period_range(start=data['startdate'],periods=data['year']*4,freq="q")
    elif data['type']=='month':
        index=pd.period_range(start=data['startdate'],periods=data['year']*12,freq="m")
    else:
        index="error"
    table=pd.Series(index=[index], data=unitcost*data["size"], name="elec_safety_cost")
    table=table.astype(int)
    return table
#기타관리운영비 계산
def operation_cost_calc(data):
    if data['size']<100:
        unitcost=230
    elif 100<=data['size']<300:
        unitcost=270
    elif 300<=data['size']<500:
        unitcost= 420
    elif 500<=data['size']<700:
        unitcost= 662.5
    elif 700<=data['size']<1000:
        unitcost= 750
    elif 1000<=data['size']<2000:
        unitcost= 800
    elif 2000<=data['size']<3000:
        unitcost= 900
    elif 3000<=data['size']<5000:
        unitcost= 2000
    elif 5000<=data['size']<10000:
        unitcost= 2400
    elif 10000<=data['size']<15000:
        unitcost= 3000
    elif 15000<=data['size']<20000:
        unitcost= 4000
    elif 20000<=data['size']<25000:
        unitcost= 5000
    elif 25000<=data['size']<30000:
        unitcost= 8000
    else:
        unitcost= "error"
    if data['type']=='quarter':
        index=pd.period_range(start=data['startdate'],periods=data['year']*4,freq="q")
    elif data['type']=='month':
        index=pd.period_range(start=data['startdate'],periods=data['year']*12,freq="m")
    else:
        index="error"
    table=pd.Series(index=[index], data=unitcost*data["size"], name="operation_cost")
    table=table.astype(int)
    return table
#기장비
def account_cost_calc(data):
    if data['size']<100:
        unitcost=1000
    elif 100<=data['size']<300:
        unitcost=1300
    elif 300<=data['size']<500:
        unitcost= 1800
    elif 500<=data['size']<700:
        unitcost= 2100
    elif 700<=data['size']<1000:
        unitcost= 2400
    elif 1000<=data['size']<2000:
        unitcost= 3600
    elif 2000<=data['size']<3000:
        unitcost= 3600
    elif 3000<=data['size']<5000:
        unitcost= 3600
    elif 5000<=data['size']<10000:
        unitcost= 4200
    elif 10000<=data['size']<15000:
        unitcost= 4200
    elif 15000<=data['size']<20000:
        unitcost= 4200
    elif 20000<=data['size']<25000:
        unitcost= 4200
    elif 25000<=data['size']<30000:
        unitcost= 4200
    else:
        unitcost= "error"
    if data['type']=='quarter':
        index=pd.period_range(start=data['startdate'],periods=data['year']*4,freq="q")
    elif data['type']=='month':
        index=pd.period_range(start=data['startdate'],periods=data['year']*12,freq="m")
    else:
        index="error"
    table=pd.Series(index=[index], data=unitcost*data["size"],name="account_cost")
    table=table.astype(int)
    return table
#기타 사무위탁비
def office_cost_calc(data):
    if data['size']<100:
        unitcost=2300
    elif 100<=data['size']<300:
        unitcost=2700
    elif 300<=data['size']<500:
        unitcost= 4200
    elif 500<=data['size']<700:
        unitcost= 6625
    elif 700<=data['size']<1000:
        unitcost= 7500
    elif 1000<=data['size']<2000:
        unitcost= 8000
    elif 2000<=data['size']<3000:
        unitcost= 9000
    elif 3000<=data['size']<5000:
        unitcost= 10000
    elif 5000<=data['size']<10000:
        unitcost= 12000
    elif 10000<=data['size']<15000:
        unitcost= 15000
    elif 15000<=data['size']<20000:
        unitcost= 20000
    elif 20000<=data['size']<25000:
        unitcost= 25000
    elif 25000<=data['size']<30000:
        unitcost= 40000
    elif 30000<=data['size']:
        unitcost= 45000
    else:
        unitcost= "error"
    if data['type']=='quarter':
        index=pd.period_range(start=data['startdate'],periods=data['year']*4,freq="q")
    elif data['type']=='month':
        index=pd.period_range(start=data['startdate'],periods=data['year']*12,freq="m")
    else:
        index="error"
    table=pd.Series(index=[index], data=unitcost*data["size"],name="office_cost")
    table=table.astype(int)
    return table
#통합비용계산
def total_cost_calc(data):
    machine_cost=machine_cost_calc(data)
    monitoring_cost=monitoring_cost_calc(data)
    insurance_cost=insurance_cost_calc(data)
    reserve_cost=reserve_cost_calc(data)
    elec_safety_cost=elec_safety_cost_calc(data)
    operation_cost=operation_cost_calc(data)
    account_cost=account_cost_calc(data)
    office_cost=office_cost_calc(data)
    total_cost=pd.concat([machine_cost,monitoring_cost,insurance_cost,reserve_cost,elec_safety_cost,operation_cost,account_cost,office_cost],axis=1)
    #total_cost=pd.DataFrame({"machine_cost":machine_cost,"elec_safety_cost":elec_safety_cost,"monitoring_cost":monitoring_cost,"nsurance_cost":insurance_cost})
    return total_cost

if __name__ == '__main__':
    data={'startdate':datetime.date.today(),'year':15,'type':'month','size':99,'weight':1.5,'average_time':3.4}
    result=total_cost_calc(data)
    print(result)
