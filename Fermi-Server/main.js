const express =require('express');
const path =require('path');
const app = express();
const mysql = require('mysql');
const bodyParser= require('body-parser');
const economic=require('./router/economic');
const energy_data=require('./router/energy_data');
const cors= require('cors');

app.use(cors());
app.use('/economic',economic.router);
app.use('/energy_data',energy_data.router);

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
