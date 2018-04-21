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
router.use(cors());

router.post('/result',(req,res)=>{
  console.log(`Post Data is ${req.body.title},${req.body.location},${req.body.size},${req.body.weight},${req.body.type}`);
  let request={
    'date':(new Date()).toString(),
    'title':req.body.title,
    'location':req.body.location,
    'size':req.body.size,
    'weight': req.body.weight,
    'type':req.body.type
  }
  let params = {
    TableName:'economics',
    Item: {
      id:new Date().getTime().toString()
    }
  }
  params.Item.request=request;
  let child=cp.spawn("python",[path.resolve(__dirname,"../python/simulation.py")]);
  child.stderr.on('data',(err)=>{
    console.log(`error:${err}`)
  })
  child.stdin.write(JSON.stringify(request));
  child.stdin.end();
  child.stdout.on('end',(data)=>{
    let response=JSON.parse(data.toString());
    params.Item.response=response;
    ddb.put(params, (err, data)=>{
      if (err) console.log(err);
      else console.log(data);
    })
  });
});

router.get('/test',(req,res)=>{
  let child=cp.spawn("python",[path.resolve(__dirname,"../python/simulation.py")]);
  let body=''
  child.stderr.on('data',(err)=>{
    console.log(`error:${err}`)
  })
  child.stdout.on('data',(data)=>{
   body+=data
   console.log(body)
   console.log(body.length);
  });
  child.stdout.on('end',()=>{
   let output=JSON.parse(body.toString().trim());
   res.json(output);
  })
});

router.get('/result/:id',(req,res)=>{
  let params = {
    TableName : 'economics',
    Key: {
      id: req.params.id
    }
  };
  ddb.get(params, (err, data)=> {
    if (err) console.log(err);
    else res.json(data);
  });
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
