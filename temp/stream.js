const cp= require("child_process")
const express = require('express');
const app = express();
const path=require("path")

let child=cp.spawn("python",[path.resolve(__dirname,"../Fermi-Server/python/simulation.py")]);
let sent_data= {
  startdate:`${(new Date()).getFullYear()}-${(new Date()).getMonth()+1}-${(new Date()).getDate()}`,
  year:15,
  size:99,
  weight:1.2,
  averagetime:3.4,
  scenario:'lm_model',
  type:'month'
};
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
  let response=JSON.parse(body.toString().trim());
  console.log(response)
});
