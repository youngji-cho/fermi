const express =require('express');
const app =express();
const bodyParser= require('body-parser');
const mysql = require('mysql');
const cors= require('cors');
const AWS =require('aws-sdk');

AWS.config.update({region:'ap-northeast-2'});
const ddb=new AWS.DynamoDB({apiVersion: '2012-10-08'});

const router= express.Router();
const spawn= require("child_process").spawn;

router.use(bodyParser.json())//"url ecodede는 action=form 형식의 url일때만사용한다. "
router.use(cors());

router.post('/result',(req,res)=>{
  console.log(`Post Data is ${req.body.title},${req.body.size},${req.body.type}`);
  let params = {
    TableName:'economic',
    Item: {
      'id':{"N": new Date().getTime().toString()},
      'request':{
        "M":{
          'title':{"S":req.body.title},
          'size':{"N":req.body.size},
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

/*
router.get('/result/:title',(req,res)=>{
  let sql = `select * from economic where title=${req.params.title}`;
  conn.query(sql, (err, rows, fields)=>{
    if(err){
      console.log('error');
      res.status(500).send('Internal Sever Error')
    }
    else {
      console.log(rows);
      res.json(rows);
    }
  })
});
*/

router.get('/test',(req,res)=>{
  const cp=spawn("python",["../python/simulation.py"]);
  cp.stdout.on('data',(data)=>{
    console.log(data);
  })
})

module.exports = {
  router:router
}
