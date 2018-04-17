/*
stdout : standard output
A stream is abstract interface for working with streaming data in Node.js
The stream module provides a base API that make it easy to build bojects that implement the stream interface.

Streams can be readable, writable, or both.All streams are instances of EventEmiiter.

*/
const questions =[
  "What is your name?",
  "What is your fav hobby?",
  "What is your preferred programming language?"
]
const answers=[];
function ask(i){
  process.stdout.write(`${questions[i]}\n\n`);
  process.stdout.write(" >\n")
}
let json ={"name":"younji","lover":"lisa"};
process.stdout.write(JSON.stringify(json))
