const http= require('http');
const port= 3000;

http.createServer((req,res)=>{
  res.writeHead(200,{'Content-Type':'text/plain'});
  res.end('Hellow World!');
}).listen(port)

console.log(`Server is in ${port}!`);
