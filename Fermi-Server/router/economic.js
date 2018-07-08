const express =require('express');
const bodyParser= require('body-parser');
const mysql = require('mysql');
const cors= require('cors');
const cp= require("child_process");
const path=require("path");
const fs = require('fs');
const AWS =require('aws-sdk');
config=JSON.parse(fs.readFileSync(path.join(__dirname,'../../config.json'), 'UTF-8'));
AWS.config.update(config.aws_sdk);
const ddb= new AWS.DynamoDB.DocumentClient();
const router= express.Router();
router.use(bodyParser.json())//"url ecodede는 action=form 형식의 url일때만사용한다. "

let db_name=""
if(process.env.NODE_ENV=='production'){
  db_name='economics'
} else if(process.env.NODE_ENV=='development'){
  db_name='economic_test'
}

router.post('/result',(req,res)=>{
  let child=cp.spawn("python",[path.resolve(__dirname,"../python/simulation.py")]);
  console.log(`Post Data is ${req.body.equity}`);
  let request={
    //첫번째
    'year':req.body.year,
    'size':req.body.size,
    'weight':req.body.weight,
    'average_time':req.body.average_time,
    'startdate':req.body.startdate,
    'plant':req.body.plant,
    //두번째
    'construction':req.body.construction,
    'othercost':req.body.othercost,
    'investment':req.body.investment,
    'equity':req.body.equity,
    'debt':req.body.debt,
    'interest':req.body.interest,
    'unredeemed':req.body.unredeemed,
    'duration':req.body.duration,
    'repayment_method':req.body.repayment_method,
    'repayment_term':req.body.repayment_term,
    'interest_repayment_term':req.body.interest_repayment_term,
    'finance_startdate':req.body.finance_startdate,
    //세번째
    'scene':req.body.scene,
    'price_index':req.body.price_index,
    'solar_index':req.body.solar_index
  }
  let params = {
    TableName:db_name,
    Item: {
      id:req.body.id
    }
  }
  params.Item.request=request;
  let body ='';
  child.stderr.on('data',(err)=>{
    console.log(`error:${err}`)
  })
  child.stdin.write(JSON.stringify(request));
  child.stdin.end();
  child.stdout.on('data',(data)=>{
    body+=data
  });
  child.stdout.on('end',()=>{
    let response=JSON.parse(body.toString().trim());
    params.Item.response=response;
    ddb.put(params, (err, data)=>{
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        res.json({success:true})
      }
    })
  });
});

router.get('/result/:id',(req,res)=>{
  let params = {
    TableName : db_name,
    Key: {
      id: req.params.id
    }
  };
  ddb.get(params, (err, data)=> {
    if (err) {
     console.log(err);
    }else {
     res.json(data);
    }
  });
});

router.get('/test',(req,res)=>{
  child.stdout.on('end',()=>{
    let response=body.toString().trim();
    console.log(response);
  });
  child.stderr.on('data',(err)=>{
    console.log(`error:${err}`)
  })
});


module.exports = {
  router:router
}
/*
ddb.getItem(params, function(err, data) {
  if (err) {
    console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
  } else {
    console.log("GetItem succeeded:", );
    res.json(JSON.stringify(data, null, 2));
  }
})
child.stderr.on('data',(err)=>{
  console.log(`error:${err}`)
});
child.stdout.on('data',(data)=>{
  res.json(data.toString().trim());
});
let sent_data= [1,2,3,4,5,6,7,8];
let dataString = '';
child.stdout.on('data',(data)=>{
  dataString += data.toString();
})
child.stdout.on('data',(data)=>{
  console.log(`Sum of Data is ${dataString}, Can you see?`);
})
child.stderr.on('data',(err)=>{
  console.log(`error:${err}`)
})
child.stdin.write(JSON.stringify(sent_data));
child.stdin.end();
*/
