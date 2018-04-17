const http=require("http");
const fs=require("fs");

const myReadStream=fs.createReadStream(__dirname+'/address.txt');
const myWriteStream=fs.createWriteStream(__dirname+'/newaddress.txt')

myReadStream.pipe(myWriteStream);
