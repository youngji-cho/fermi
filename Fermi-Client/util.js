export function datechangeMonth(date){
  let x=new Date(date)
  return `${x.getFullYear()}년 ${x.getMonth()+1}월`;
}

export function datechangeQuarter(date){
  let x=new Date(date)
  let y=(x.getMonth()+1)
  if (y>=1 &&y<4){
    return `${x.getFullYear()}년 1분기`;
  } else if (y>=4 &&y<7){
    return `${x.getFullYear()}년 2분기`;
  } else if (y>=7 &&y<10){
    return `${x.getFullYear()}년 3분기`;
  } else if (y>=10 &&y<13){
    return `${x.getFullYear()}년 4분기`;
  } else {
    return 'error';
  }
}

export function datechangeYear(date){
  let x=new Date(date)
  return `${x.getFullYear()}년`;
}

export function datechangeDate(date){
  let x=new Date(date)
  return `${x.getFullYear()}년 ${x.getMonth()+1}월 ${x.getDate()}월`;
}

export function datechange(date){
  let x=new Date(date)
  return `${x.getFullYear()}-${x.getMonth()+1}-${x.getDate()}`;
}
