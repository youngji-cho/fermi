const sayings =[
  "you may delay, but time will not",
  "Tell me and I forget",
  "I takes my good deeds",
  "By failing to prepare"
]

const interval =setInterval(()=>{
  let i =Math.floor(Math.random()*sayings.length);
  process.stdout.write(`${sayings[i]} \n`);
},1000)

process.stdin.on('data',(data)=>{
  console.log(`STDIN Data Recevied-> ${data.toString().trim()}`);
  clearInterval(interval);
  process.exit();
})
