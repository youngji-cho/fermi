/*
stdout : standard output
*/

const question =[
  "What is your name?",
  "What is your fav hobby?",
  "What is your preferred programming language?"
]
const answers=[];
function ask(i){
  process.stdout.write(`${question[i]}\n\n`);
  process.stdout.write("World \n\n")
}
process.stdin.on('data',(data)=>{
  process.stdout.write("\n"+data.toString().trim()+"\n")
})
ask(0);
