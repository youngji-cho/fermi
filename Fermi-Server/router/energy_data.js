const express =require('express');
const app = express();
const mysql = require('mysql');
const cors= require('cors');
const bodyParser = require('body-parser');
const AWS =require('aws-sdk');
const router= express.Router();
const fs = require('fs');
const path =require('path')
const config=JSON.parse(fs.readFileSync(path.join(__dirname,'../../config.json'), 'UTF-8'));
const conn =mysql.createConnection(
  config.energy_data
);
conn.connect((err)=>{
  if (err) throw err;
  console.log("Mysql Connected!");
});

router.get('/smp_price', (req, res) => {
  let sql = `select date,land_price,jeju_price,total_price from smp_price order by date desc` ;
  conn.query(sql,(err,rows,fields)=>{
  if(err){
    console.log('error');
    res.status(500).send('Internal Sever Error')
  } else {
    console.log(rows);
    res.json(rows);
    }
  })
});

router.get('/rec_price', (req, res) => {
  let sql = `select date, land_or_jeju, average_price, lowest_price,highest_price,transaction_money,sell_deals,sell_amount,buy_deals, buy_amount,success_deals,success_amount from energy_data.rec_price order by date desc`;
  conn.query(sql,(err,rows,fields)=>{
     if(err){
       console.log('error');
       res.status(500).send('Internal Sever Error')
     } else {
       console.log(rows);
       res.json(rows);
     }
   })
});

module.exports = {
  router:router
}
