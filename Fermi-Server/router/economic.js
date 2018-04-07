const express =require('express');
const bodyParser= require('body-parser');
const mysql = require('mysql');
const cors= require('cors');
const AWS =require('aws-sdk');
const cp= require("child_process");

AWS.config.update({region:'ap-northeast-2'});
const ddb=new AWS.DynamoDB({apiVersion: '2012-10-08'});

const router= express.Router();
router.use(bodyParser.json())//"url ecodede는 action=form 형식의 url일때만사용한다. "
router.use(cors());

router.post('/result',(req,res)=>{
  console.log(`Post Data is ${req.body.title},${req.body.location},${req.body.size},${req.body.weight},${req.body.type}`);
  let params = {
    TableName:'economic',
    Item: {
      'id':{"N": new Date().getTime().toString()},
      'request':{
        "M":{
          'title':{"S":req.body.title},
          'location':{"S":req.body.location},
          'size':{"N":req.body.size},
          'weight':{"N":req.body.weight},
          'type':{"S":req.body.type}
        }
      }
    }
  }
  ddb.putItem(params, function(err, data) {
  if (err) {
    console.log("Error", err);
    } else {
    console.log("Success", data);
    }
  });
});

router.get('/result',(req,res)=>{
  let child=cp.spawn("python",["./Fermi-Server/python/simulation.py"]);
  child.stderr.on('data',(err)=>{
    console.log(`error:${err}`)
  });
  child.stdout.on('data',(data)=>{
    res.json(data.toString().trim());
  });
})

module.exports = {
  router:router
}
