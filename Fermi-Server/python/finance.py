import sys
import os
import json
from datetime import datetime
import numpy as np
import pandas as pd

params={'startdate':'2018-07-10','year':25,'size':99.5,'weight':1.5,'averagetime':3.4,"scenario":"lm_model","type":"month","plant":"solar", "contruction":150000000,"investment":180000000,"othercost":25000000,"principal":120000000,"interest":0.05, "unredeemed":12321321123,"duration":12,
"repayment_method":"cpm","repayment_term":"m","interest_repayment_term":"m","finance_startdate":"2018-06-13"}

def money_trim(array):
    result=round(array,-1)
    result=result.astype(int)
    return result

#원금균등상환(Constant Amortization Mortgage)
def CAM_calc(startdate,duration,principal,interest,term,interest_term):
    start=datetime.strptime(startdate,'%Y-%m-%d')
    if(interest_term=="y"):
        amortization=pd.DataFrame(index=pd.date_range(start,periods=params["duration"],freq="y").shift(n=-(start.month+1),freq="m").shift(n=start.day,freq="d"))
        amortization["principal"]=0; amortization["remained_principal"]=0;amortization["interest"]=0;amortization["payback"]=0;
        amortization["remained_principal"][0]=principal;
        amortization["principal"]=principal/duration;amortization.principal[0]=0
        for i in range(1, amortization.shape[0]):
            amortization.remained_principal.iloc[i]=amortization.remained_principal.iloc[i-1]-amortization.principal.iloc[i];
            amortization.interest[i]=amortization.remained_principal[i-1]*interest
    if(interest_term=="q"):
        amortization=pd.DataFrame(index=pd.date_range(start,periods=duration*4+1,freq="q").shift(n=-1,freq="m").shift(n=start.day,freq="D"))
        amortization["principal"]=0; amortization["remained_principal"]=0;amortization["interest"]=0;amortization["payback"]=0;
        amortization["remained_principal"][0]=principal;
        if(term=="y"):
            amortization.loc[::4,"principal"]=params["principal"]/duration; amortization.principal[0]=0;
        if(term=="q"):
            amortization["principal"]=principal/(duration*4);amortization.principal[0]=0
        for i in range(1, amortization.shape[0]):
            amortization.remained_principal.iloc[i]=amortization.remained_principal.iloc[i-1]-amortization.principal.iloc[i];
            amortization.interest[i]=amortization.remained_principal[i-1]*interest/4
    if(interest_term=="m"):
        amortization=pd.DataFrame(index=pd.date_range(start,periods=duration*12+1,freq="m").shift(n=-1,freq="m").shift(n=start.day,freq="D"))
        amortization["principal"]=0; amortization["remained_principal"]=0;amortization["interest"]=0;amortization["payback"]=0;
        amortization["remained_principal"][0]=principal;
        if(term=="y"):
            amortization.loc[::12,"principal"]=params["principal"]/duration; amortization.principal[0]=0;
        if(term=="q"):
            amortization.loc[::3,"principal"]=principal/(duration*4);amortization.principal[0]=0;
        if(term=="m"):
            amortization["principal"]=principal/(duration*12); amortization.principal[0]=0;
        for i in range(1, amortization.shape[0]):
            amortization.remained_principal.iloc[i]=amortization.remained_principal[i-1]-amortization.principal.iloc[i];
            amortization.interest[i]=amortization.remained_principal[i-1]*interest/12
    amortization["payback"]=amortization["principal"]+amortization["interest"]
    amortization=amortization.apply(money_trim,axis=0)
    return amortization

#원리금 균등상환(Constant Payment Mortgage)
def CPM_calc(startdate,duration,principal,interest,term):
    start=datetime.strptime(startdate,'%Y-%m-%d')
    if(term=="y"):
        amortization=pd.DataFrame(index=pd.date_range(start,periods=duration+1,freq="Y").shift(n=start.day,freq="D"))
        amortization["payback"]=0;amortization["interest"]=0;amortization["principal"]=0
        amortization.principal.iloc[1:amortization.shape[0]]=-np.ppmt(params["interest"], amortization.principal.iloc[1:amortization.shape[0]],params["duration"],params["principal"])
        amortization.interest.iloc[1:amortization.shape[0]]=-np.ipmt(params["interest"], amortization.interest.iloc[1:amortization.shape[0]],params["duration"],params["principal"])
        amortization.payback.iloc[1:amortization.shape[0]]=-np.pmt(interest, duration,principal)
        amortization.payback=amortization.apply(money_trim, axis=1)
    if(term=="q"):
        amortization=pd.DataFrame(index=pd.date_range(start,periods=duration*4+1,freq="q").shift(n=start.day,freq="D"))
        amortization["payback"]=0;amortization["interest"]=0;amortization["principal"]=0
        amortization.principal.iloc[1:amortization.shape[0]]=-np.ppmt(params["interest"]/4, amortization.principal.iloc[1:amortization.shape[0]],params["duration"]*4,params["principal"])
        amortization.interest.iloc[1:amortization.shape[0]]=-np.ipmt(params["interest"]/4, amortization.interest.iloc[1:amortization.shape[0]],params["duration"]*4,params["principal"])
        amortization.payback.iloc[1:amortization.shape[0]]=-np.pmt(interest/4, duration*4,principal)
        amortization.payback=amortization.apply(money_trim, axis=1)
    if(term=="m"):
        amortization=pd.DataFrame(index=pd.date_range(start,periods=duration*12+1,freq="M").shift(n=start.day,freq="D"))
        amortization["payback"]=0;amortization["interest"]=0;amortization["principal"]=0
        amortization.principal.iloc[1:amortization.shape[0]]=-np.ppmt(params["interest"]/12, amortization.principal.iloc[1:amortization.shape[0]],params["duration"]*12,params["principal"])
        amortization.interest.iloc[1:amortization.shape[0]]=-np.ipmt(params["interest"]/12, amortization.interest.iloc[1:amortization.shape[0]],params["duration"]*12,params["principal"])
        amortization.payback.iloc[1:amortization.shape[0]]=-np.pmt(interest/12, duration*12,principal)
        amortization.payback=amortization.apply(money_trim, axis=1)
    amortization=amortization.apply(money_trim,axis=0)
    return amortization
