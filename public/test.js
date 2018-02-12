const parseTime =d3.timeParse("%Y-%m-%d")
function unitConverter(x){
  return {
    date:parseTime(x.date),
    average_price:parseInt(x.average_price)
  }
}

let width=1000;
let height=500;
let margin ={
  top:20, right :20, bottom :30, left:50
}

const recSvg =d3.select("body")
  .append("svg")
  .attr("width",width)
  .attr("height",height)

recSvg.append("g")
  .attr("transform",`translate(${margin.left},${margin.top})`);

const xScale =d3.scaleTime()
  .rangeRound([margin.left,width-margin.right]);
const yScale =d3.scaleLinear()
  .rangeRound([height-margin.bottom,margin.top]);


d3.json('test.json',(error,data)=>{
  if(error) throw error;
  for (let i=0;i<data.length;i++){
    data[i].date=parseTime(data[i].date);
    console.log(data[i].date);
  }
});
