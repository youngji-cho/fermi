const spawn= require("child_process").spawn;
const express = require('express')
const app = express()

app.get('/',(req,res)=>{
  let cp=spawn("python",["../Fermi-Server/python/simulation.py"]);
  cp.stdout.on('data',(data)=>{
    console.log(data);
  })
})

app.listen(4000,()=>console.log("app is running!"))

/*


cp.stdout.on("data",(data)=>{
  console.log(data.toString())
});
cp.on("close",()=>{
  console.log("child_process")
  process.exit()
})

setTimeout(()=>{
  cp.stdin.write("stop")
},4000)

const exec =require("child_process").exec;

exec("git version",(err,stdout)=>{
  if(err){
    throw err;
  }
  console.log("Git Version");
  console.log(stdout);
})
console.log(process.argv)

const waitTime=3000;
console.log("Wait for it")
let currentTime =0;
let waitInterval =500;

setInterval(()=>{
  currentTime +=waitInterval;
  console.log(`second is ${currentTime/1000} seconds...`)
})

setTimeout(()=>{
  console.log("Done")

},waitTime)

function ask(d,i){
  process.stdout.write(d[i]);
  process.stdout.write(" >>>>>>");
}

let answers=[];
process.stdin.on("data",(data)=>{
  let questions=[
    "What is your name?",
    "What is your hobby?",
    "What is your preferred programming language"
  ]
  answers.push(data.toString().trim());
  if (answers.length<=questions.length){
    ask(questions,answers.length-1)
  } else {
    process.exit();
  }
})



function grab(flag){
  let index =process.argv.indexOf(flag);
  return (index===-1) ? null :process.argv[index+1]
}
let greeting =grab('--greeting');
let user =grab('--user');

if(!user|| !greeting){
  console.log("You Blew It")
} else {
  console.log(`Welcome ${user} and ${greeting}`)
}
const exec =require('child_process').exec
exec('cat test.js',(err,stdout,stderr)=>{
  console.log("we got success!",stderr);
})


let bears=0
bears +=1
const spawn =require('child_process').spawn

if (process.argv[2]==='child'){
  let net =require('net')
  let pipe =new net.Socket({fd:3})
  console.log("child",bears)
}else{
  console.log("You have to spawn!");
  let child=spawn(process.execPath,[__filename,'child'],{
    stdio:[null,null,null,"pipe"]
  });
  child.stdio[3].on('data',(data)=>{
    console.log("data is",data)
    if(data.toString()===killme){
      console.log("RIP")
      child.kill()
    }
  })
  console.log("parent",bears)
}
*/
