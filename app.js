'use strict';

const express = require('express');
const app= express();
const bodyParser= require('body-parser');
const request = require('request');
const naver_client_id = 'Pj4B0L4re6R4hCANOPLV';
const naver_client_secret = 'WowPFMQTaJ';

app.set('view engine','pug');
app.set('views','./views');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));
app.locals.pretty =true;

app.get('/', (req, res) => {
  res.status(200).render('index');
});

app.get('/smp_price', (req, res) => {
  res.status(200).render('smp_price');
});

app.get('/rec_price', (req, res) => {
  res.status(200).render('rec_price');
});

app.get('/regulation', (req, res) => {
  res.status(200).render('regulation');
});

app.get('/power-plant', (req, res) => {
  res.status(200).render('power-plant');
});

app.get('/test', (req, res) => {
  res.status(200).render('test');
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
