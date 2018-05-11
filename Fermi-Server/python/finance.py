import sys
import os
import json
import datetime
import numpy as np
import pandas as pd

def toQuarter(data):
    quarter= []
    for i in range(0,data.index.size):
        quarter.append(str(data.index.year[i])+'-'+str(data.index.quarter[i]))
    return quarter

def date_calc(startdate,debt,duration,repayment_term):
    result=pd.DataFrame(index=pd.period_range(start=startdate,periods=duration*12+1,freq="m"))
    result['days']=result.index.day
    start=pd.to_datetime(startdate, format='%Y-%m-%d', errors='ignore')
    startday=start.date().timetuple()
    result.days[0]=result.days[0]-startday.tm_mday
    result.days[result.shape[0]-1]=startday.tm_mday
    if repayment_term=="m":
        return result
    elif repayment_term=="q":
        result.index=toQuarter(result)
        result=result.groupby(result.index).sum()
        return result
    elif repayment_term=="y":
        result.index=result.index.year
        result=result.groupby(result.index).sum()
        return result

def CAM_calc(data,debt,interest,type,year,duration):
    data["debt"]=0; data["remained_debt"]=0;data["interest"]=0;
    if(type=="m"):
        for i in range(1,duration+1):
            data.debt[12*i]=debt/duration;
        for j in range(0, duration):
            data.remained_debt[12*j]=debt-debt/duration*j
            for k in range(0,12):
                    data.interest[12*j+k]=data.remained_debt[12*j]*interest/12
        return data
    if(type=="q"):
        for i in range(1, duration+1):
            data.debt[4*i]=debt/duration;
        for j in range(0, duration):
            data.remained_debt[4*j]=debt-debt/duration*j
            for k in range(0,4):
                    data.interest[4*j+k]=data.remained_debt[4*j]*interest/4
        return data
    if(type=="y"):
        for i in range(0, duration+1):
            data.debt.iloc[i]=debt/duration
            data.remained_debt.iloc[i]=debt-debt/duration*i
            data.interest.iloc[i]=data.remained_debt.iloc[i]*interest
        return data

def CPM_calc(data,debt,interest,type,year):
    if(type=="m"):
        term=year*12
        divided_interest=(1+interest/12)
        money=(debt*divided_interest*(1+divided_interest)**term)/((1+divided_interest)**term-1)
        data["payback"]=money;
        data.payback[0]=0;
        return data
    elif(type=="q"):
        term=year*4
        divided_interest=(1+interest/4)
        money=(debt*divided_interest*(1+divided_interest)**term)/((1+divided_interest)**term-1)
        data["payback"]=money
        data.payback[0]=0;
        return data
    elif(type=="y"):
        term=year
        divided_interest=(1+interest)
        money=(debt*divided_interest*(1+divided_interest)**term)/((1+divided_interest)**term-1)
        data["payback"]=money
        data.payback[0]=0;
        return data
    else:
        return "error"
