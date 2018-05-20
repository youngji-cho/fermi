const cp= require("child_process")
const express = require('express');
const app = express();
const path=require("path")

let child=cp.spawn("python",[path.resolve(__dirname,"../Fermi-Server/python/test.py")]);
let sent_data= {
  year:25,size:99.5,weight:1.5,average_time:3.4,
  plant:"solar",startdate:'2018-7-20',construction:150000000,investment:180000000,othercost:25000000,debt:120000000,equity:60000000,interest:0.05,unredeemed:100000,duration:12,repayment_method:"cpm",repayment_term:"m",interest_repayment_term:"q",finance_startdate:'2018-7-20',scene:'lm_model',price_index:0.01,solar_index:-0.08 };
child.stderr.on('data',(err)=>{
  console.log(`error:${err}`)
})
child.stdin.write(JSON.stringify(sent_data));
child.stdin.end();
let body ='';
child.stdout.on('data',(data)=>{
  console.log(data)
  body+=data
});
child.stdout.on('end',()=>{
  /*let response=JSON.parse(body.toString().trim());
  console.log(response)*/
  console.log(body.toString().trim())
});
