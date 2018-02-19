const express =require('express');
const app = express();

app.use('/',express.static(__dirname + '/../public'));

app.get('/hello',(req,res)=>{
  return res.send('Can you hear me')
})

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
