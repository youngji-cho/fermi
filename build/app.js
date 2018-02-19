'use strict';

var express = require('express');
var app = express();
var port = 3000;

app.use('/', express.static(__dirname + '/../public'));

app.get('/hello', function (req, res) {
  return res.send('Can you hear me');
});

app.listen(port, function () {
  console.log('Express listening on port');
});