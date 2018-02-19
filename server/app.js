const express =require('express');
const app = express();
const port =3000;

app.use('/',express.static(__dirname + '/../public'));

app.get('/hello',(req,res)=>{
  return res.send('Can you hear me')
})

app.listen(port,()=>{
  console.log('Express listening on port');
})
