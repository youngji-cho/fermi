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
};

const recSvg =d3.select("body")
  .append("svg")
  .attr("width",width)
  .attr("height",height)

const g=recSvg.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

const xScale =d3.scaleTime()
  .rangeRound([margin.left,width-margin.right]);
const yScale =d3.scaleLinear()
  .rangeRound([height-margin.bottom,margin.top]);
const line = d3.line()
  .x((d)=>{return xScale(d.date);})
  .y((d)=>{return yScale(d.average_price);});


d3.json('test2.json',(error,data)=>{
  if(error) throw error;

  xScale.domain(d3.extent(data,(d)=>{
    return d.date;
  }));
  yScale.domain(d3.extent(data,(d)=>{
    return d.average_price;
  }));

  g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);

  g.append("g")
    .attr("transform", "translate(0," + (height-margin.top) + ")")
      .call(d3.axisBottom(xScale));

  g.append("g")
      .call(d3.axisLeft(yScale));
});
