
const express = require('express');
const app= express();
const bodyParser= require('body-parser');

app.set('view engine','pug');
app.set('views','./views');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));
app.locals.pretty =true;

app.get('/', (req, res) => {
  res.status(200).render('index');
});

app.get('/price', (req, res) => {
  res.status(200).render('price');
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

app.get('/blog', (req, res) => {
  res.status(200).render('blog');
});

// [END hello_world]

if (module === require.main) {
  // [START server]
  // Start the server
  const server = app.listen(process.env.PORT || 8081, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
  // [END server]
}

module.exports = app;
