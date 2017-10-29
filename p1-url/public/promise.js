var _promise = function (param){
  return new Promise(function(resolve, reject){
    //비동기 표현
    window.setTimeout(function(){
      if (parma){
        resolve("해결완료");
      }else{
        reject(Error("실패!"));
      }
    },3000);
  });
};

_promise(true)
.then(function(text){
  console.log(text);
}),function(error){
  console.log(error);
});
