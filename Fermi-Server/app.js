const express =require('express');
const path =require('path');
const app = express();

//app.use(express.static(__dirname+'/../Fermi-Client/'));

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
/*
app.get('/a', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, './../Fermi-Client/a.html'));
});
app.get('/data',  (req, res)=>{
  res.json({'express':'this is hard'});
});
*/

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
