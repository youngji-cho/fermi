let svg=d3.select("#chart")

let legendbox=svg.append('g').selectAll()
  .data(["yellow","red","blue"])
  .enter().append("rect")
  .attr("width",10)
  .attr("height",10)
  .attr("fill",function(d){
    return d;
  })
  .attr("transform",function(d,i){
    return "translate(50,"+ (i*20+20)+")"
  });

let legendtext=svg.append('g').selectAll()
  .data([1,2,3])
  .enter().append('text')
  .text(function(d){
    return d;
  })
  .attr("transform",function(d,i){
    return "translate(70,"+ (i*20+30)+")"
  });

/*
legend.selectAll()
  .data([1,2,3])
  .enter()


svg.selectAll('.legends')
  .data([1,2,3])
  .enter().append('g')
*/




function chartdraw(data){
  let parseTime = d3.timeParse("%Y-%m-%d");
  let margin ={top:20, right:20,bottom:30,left:50},
    width=1000,
    height=500;

  let xScale=d3.scaleTime().range([margin.left,width-margin.right]);
  let yScale=d3.scaleLinear().range([height-margin.top,margin.bottom]);

  let average_line=d3.line()
    .x(function(d){return xScale(d.date)})
    .y(function(d){return yScale(d.average_price)});

  let lowest_line=d3.line()
    .x(function(d){return xScale(d.date)})
    .y(function(d){return yScale(d.lowest_price)});

  let highest_line=d3.line()
    .x(function(d){return xScale(d.date)})
    .y(function(d){return yScale(d.highest_price)});

  let svg=d3.select("#chart")
    .attr("width",width + margin.left + margin.right)
    .attr("height",height + margin.top + margin.bottom)
    .attr('preserveAspectRatio', 'xMinYMin meet')
    .attr('viewBox', '0 0 ' + (width + margin.left + margin.right) + ' ' + (height + margin.top + margin.bottom));

  data.forEach(function(d){d.date=parseTime(d.date)});
  xScale.domain(d3.extent(data,function(d){
    return d.date;
  }));
  yScale.domain([d3.min(data,function(d){
    return Math.min(d.lowest_price,d.average_price,d.highest_price);
  }),d3.max(data,function(d){
    return Math.max(d.lowest_price,d.average_price,d.highest_price);
  })]);

  svg.append("path")
    .data([data])
    .attr("class", "line")
    .attr("stroke","yellow")
    .attr("d", highest_line);

  svg.append("path")
    .data([data])
    .attr("class", "line")
    .style("stroke", "blue")
    .attr("d", average_line);

  svg.append("path")
    .data([data])
    .attr("class", "line")
    .style("stroke", "red")
    .attr("d", lowest_line);

  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisTop(xScale)
    .tickFormat(d3.timeFormat("%Y-%m-%d")));
  svg.append("g")
    .call(d3.axisRight(yScale));
}

const id="land";

fetch(`http://localhost:8080/rec_data1/average_price/lowest_price/highest_price/2017-01-01/2018-03-14/land`).then(
response => {
  if (response.ok) {
   return response.json();
  }
  throw new Error('Request failed!');
}, networkError => {
  console.log(networkError.message);
}).then(jsonResponse => chartdraw(jsonResponse));


function recGraph(id){
  fetch(`http://www.fermi.me/rec_data1/average_price/highest_price/lowest_price/1990-05-08/2018-03-31/${id}`).then(
  response => {
  	if (response.ok) {
     return response.json();
    }
    throw new Error('Request failed!');
  }, networkError => {
    console.log(networkError.message);
  }).then(jsonResponse => chartdraw(jsonResponse));
}
