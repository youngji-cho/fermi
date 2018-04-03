const express =require('express');
const app = express();
const mysql = require('mysql');
const cors= require('cors');
const bodyParser = require('body-parser');
const AWS =require('aws-sdk');

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

router.get('/smp_price1', (req, res) => {
   let sql = `select date,land_price,jeju_price,total_price from smp_price1 order by date desc` ;
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

router.get('/rec_price1/:price1/:price2/:price3/:land', (req, res) => {
  let sql = `select date,${req.params.price1},${req.params.price2},${req.params.price3} from rec_price3 where land_or_jeju ='${req.params.land}' and average_price !=0 order by date`;

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

router.get('/rec_price2', (req, res) => {
   let sql = `select date,land_or_jeju,average_price,lowest_price,highest_price ,transaction_money,sell_deals,sell_amount,buy_deals,buy_amount,sucess_deals,success_amount from rec_price3 order by date desc`
   ;
   conn.query(sql,(err,rows,fields)=>{
     if(err){
      res.status(500).send('Internal Sever Error')
    } else {
      res.json(rows);
    }
  })
});

module.exports = {
  router:router
}
