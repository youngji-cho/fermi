
const AWS =require('aws-sdk');
const fs = require('fs');
const path =require('path');
const cp= require("child_process");
const config=JSON.parse(fs.readFileSync(path.join(__dirname,'../config.json'), 'UTF-8'));
AWS.config.update(config.aws_sdk);
const ddb= new AWS.DynamoDB.DocumentClient();
let params = {
  TableName:'economic',
  Item: {
    id:137
  }
}
let request={
  date:(new Date()).toString(),
  title:'req.body.title',
  location:'req.body.location',
  size:'req.body.size',
  weight:'req.body.weight',
  type:'req.body.type'
}
params.Item.request=request;
/*

*/
let child=cp.spawn("python",[path.resolve(__dirname,"../Fermi-Server/python/simulation.py")]);
child.stderr.on('data',(err)=>{
  console.log(`error:${err}`)
})
child.stdin.write(JSON.stringify(request));
child.stdin.end();
child.stdout.on('data',(data)=>{
  let response=JSON.parse(data.toString());
  console.log(typeof(response))
  params.Item.response=response;
  ddb.put(params, (err, data)=>{
    if (err) console.log(err);
    else console.log(data);
  })
});
/*

cp.exec(" python ../Fermi-Server/python/simulation.py",(error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  output=JSON.parse(stdout);
  console.log(`stdout: ${output}`);
  console.log(`stderr: ${stderr}`);
})
const AWS =require('aws-sdk');
const fs = require('fs');
const path =require('path');
const cp= require("child_process");
const config=JSON.parse(fs.readFileSync(path.join(__dirname,'../config.json'), 'UTF-8'));
AWS.config.update(config.aws_sdk);

const ddb= new AWS.DynamoDB.DocumentClient();
var id=new Date().getTime().toString();
var input={
  id:id,
  request:{
    time:1321312,
    title:1323123,
    location:132313,
    size:132312312,
    weight:132313,
    type:2432455
  }
}
var params = {
  TableName:'economic',
  Item: {
    'input':input
  }
}
ddb.put(params, function(err, data) {
  if (err) {
    console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
  } else {
    console.log("Added item:", JSON.stringify(data, null, 2));
  }
});
*/
