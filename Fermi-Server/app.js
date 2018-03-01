const express =require('express');
const path =require('path');
const app = express();
const mysql = require('mysql');
const bodyParser= require('body-parser');
const cors= require('cors');

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
app.get('/data',  (req, res)=>{
  res.json({'express':'this is hard'});
});

app.get('/rec_data/:price/:start_date/:end_date/:land', (req, res) => {
  let sql = `select date,${req.params.price} from energy.rec_price where land_or_jeju ='${req.params.land}' and date >='${req.params.start_date}' and date <='${req.params.end_date}' order by date` ;
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
  const cssUrl =/styles.css/;
  if(bundleUrl.test(req.url)){
    console.log(`bundle url is ${req.url}`);
    res.sendFile(path.resolve(__dirname, './../Fermi-Client/bundle.js'));
  } else if(cssUrl.test(req.url)) {
    res.sendFile(path.resolve(__dirname, './../Fermi-Client/styles.css'));
  } else {
    console.log(`other url is ${req.url}`);
    res.sendFile(path.resolve(__dirname, './../Fermi-Client/index.html'));
  }
});




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
