const express =require('express');
const app =express();
const bodyParser= require('body-parser');
const mysql = require('mysql');
const cors= require('cors');

const router= express.Router();
const conn =mysql.createConnection({
  host: "fermi-master.c4kp2nxu0eer.ap-northeast-2.rds.amazonaws.com",
  user: "admin",
  password: "fermi1234",
  database : 'energy_data2',
  dateStrings: true
});
conn.connect((err)=>{
  if (err) throw err;
  console.log("Mysql Connected!");
});

router.use(bodyParser.json())//"url ecodede는 action=form 형식의 url일때만사용한다. "
router.use(cors());

router.post('/result',(req,res)=>{
  console.log(`Post Data is ${req.body.title},${req.body.size},${req.body.type}`);
  let sql = `insert into economic (title,size,plant_type) values(?,?,?)`;
  conn.query(sql,[req.body.title,req.body.size,req.body.type],(err, rows, fields)=>{
    if(err){
      console.log('mysql error');
      res.status(500).send('Internal Sever Error')
    }
    else {
      console.log(rows);
      res.json({result:'success'});
    }
  })
});

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

module.exports = {
  router:router
}
