const express =require('express');
const path =require('path');
const app = express();
const mysql = require('mysql');
const bodyParser= require('body-parser');
const cors= require('cors');

app.use(cors());

const conn =mysql.createConnection({
  host: "fermi-master.c4kp2nxu0eer.ap-northeast-2.rds.amazonaws.com",
  user: "admin",
  password: "fermi1234",
  database : 'energy_data2',
  dateStrings: true
});

conn.connect((err)=>{
  if (err) throw err;
  console.log("Connected!");
});

app.get('/smp_data/:price/:start_date/:end_date/', (req, res) => {
  let sql = `select date,${req.params.price} from smp_price1 where date >='${req.params.start_date}' and date <='${req.params.end_date}' order by date` ;
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

app.get('/rec_data1/:price1/:price2/:price3/:land', (req, res) => {
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

 app.get('/rec_data2', (req, res) => {
   let sql = `select date,land_or_jeju,average_price,lowest_price,highest_price ,transaction_money,sell_deals,sell_amount,buy_deals,buy_amount,sucess_deals,success_amount from rec_price3 order by date desc`
   ;
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


app.get('*', (req, res, next) => {
  const bundleUrl = /bundle.js/;
  if(bundleUrl.test(req.url)){
    console.log(`bundle url is ${req.url}`);
    res.sendFile(path.resolve(__dirname, './../Fermi-Client/bundle.js'));
  } else {
    console.log(`other url is ${req.url}`);
    res.sendFile(path.resolve(__dirname, './../Fermi-Client/index.html'));
  }
});




if (module === require.main) {
  // [START server]
  // Start the server
  const server = app.listen(process.env.PORT || 8080, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
  // [END server]
}

module.exports = app;
