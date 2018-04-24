const express =require('express');
const path =require('path');
const app = express();
const mysql = require('mysql');
const economic=require('./router/economic');
const energy_data=require('./router/energy_data');
const cors= require('cors');
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS

if(process.env.NODE_ENV=='production'){
  console.log("Production Mode")
  process.env.PORT=3000
} else if(process.env.NODE_ENV=='development'){
  console.log("Development Mode")
  process.env.PORT=4000
}

app.use(redirectToHTTPS([/localhost:(\d{4})/], [/\/insecure/], 301));

app.use(cors());
app.use('/economic',economic.router);
app.use('/energy_data',energy_data.router);
app.use('/',express.static(path.resolve(__dirname, './../Fermi-Client')));
app.get('*', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, './../Fermi-Client/index.html'));
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
