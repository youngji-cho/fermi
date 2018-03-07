const http= require('http');
const express= require('express');
const app=express();
const port= 3000;

app.get('/',(req,res)=>{
  res.send(`${req.protocol}`);
});

app.listen(port,()=>{
  console.log(`Server is in ${port}!`);
})
