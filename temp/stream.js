const cp= require("child_process")
const express = require('express');
const app = express();
const path=require("path")

let child=cp.spawn("python",[path.resolve(__dirname,"../Fermi-Server/python/operation.py")]);
let sent_data= {
  size:99,
  type:1.5
};
child.stderr.on('data',(err)=>{
  console.log(`error:${err}`)
})
child.stdin.write(JSON.stringify(sent_data));
child.stdin.end();
child.stdout.on('data',(data)=>{
  console.log(data.toString())
})
