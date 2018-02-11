'use strict';

const d3= require('d3');
const express = require('express');
const app= express();
const bodyParser= require('body-parser');
const request = require('request');
const mysql = require('mysql');
const fs=require('fs');
const cors= require('cors');

app.set('view engine','pug');
app.set('views','./views');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));
app.use(cors());
app.locals.pretty =true;

const conn =mysql.createConnection({
  host: "aa1fir4gj2lkhs2.c4kp2nxu0eer.ap-northeast-2.rds.amazonaws.com",
  user: "youngji",
  password: "whdudwl4143",
  dateStrings: true
});

conn.connect((err)=>{
  if (err) throw err;
  console.log("Connected!");
});

app.get('/', (req, res) => {
  res.status(200).render('index');
});

app.get('/smp_price', (req, res) => {
  res.status(200).render('smp_price');
});

app.get('/regulation', (req, res) => {
});

app.get('/power-plant', (req, res) => {
  res.status(200).render('power-plant');
});

app.get('/media', (req, res) => {
  res.status(200).render('media');
  let api_url = 'https://openapi.naver.com/v1/search/blog?query=' + encodeURI(req.query.query);
  let request = require('request');
  let options = {
      url: api_url,
      headers: {'X-Naver-Client-Id':naver_client_id, 'X-Naver-Client-Secret': naver_client_secret}
   };
   request.get(options, function (error, response, body) {
     if (!error && response.statusCode == 200) {
       res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
       res.end(body);
     } else {
       res.status(response.statusCode).end();
       console.log('error = ' + response.statusCode);
     }
   });
});

app.get('/rec_data/:price/:start_date/:end_date/:land', (req, res) => {
let sql = `select date,${req.params.price} from energy.rec_price where land_or_jeju ='${req.params.land}' and date >='${req.params.start_date}' and date <='${req.params.end_date}'` ;
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

app.get('/test',(req,res)=>{
  fs.readFileSync('test.html');
})


// [END hello_world]

if (module === require.main) {
  // [START server]
  // Start the server
  const server = app.listen(process.env.PORT || 3000, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
  // [END server]
}

module.exports = app;
