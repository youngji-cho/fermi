export function datechange(date){
  let x=new Date(date)
  return `${x.getFullYear()}-${x.getMonth()+1}-${x.getDate()}`;
}
export function datechangeMonth(date){
  let x=new Date(date)
  return `${x.getFullYear()}년 ${x.getMonth()+1}월`;
}
