import React from 'react';
d3=require('d3')

export class SmpChartA extends React.Component{
  constructor(props){
    super(props);
    this.state={
      color:"steelblue",
      legend:"SMP 월간가중평균가격"
    };
    this.handleClick=this.handleClick.bind(this);
    this.chartdraw=this.chartdraw.bind(this)
  }

  chartdraw(data){
    let parseTime = d3.timeParse("%Y-%m-%d");
    let margin ={top:50, right:50,bottom:50,left:50},
      width=1000,
      height=1000;
    let radius=5;
    let legend={bottom:100,left:50,width:20};
    let xScale=d3.scaleTime().range([margin.left,width-margin.right]);
    let yScale=d3.scaleLinear().range([height-margin.top,margin.bottom]);
    let line=d3.line()
      .x(function(d){return xScale(d.date)})
      .y(function(d){return yScale(d.total_price)});

    let svg=d3.select("#SmpChartA")
      .attr("width",width + margin.left + margin.right)
      .attr("height",height + margin.top + margin.bottom)
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('viewBox', '0 0 ' + (width + margin.left + margin.right) + ' ' + (height + margin.top + margin.bottom));

    data.forEach(function(d){d.date=parseTime(d.date)});
    xScale.domain(d3.extent(data,function(d){
      return d.date;
    }));
    yScale.domain(d3.extent(data,function(d){
      return d.total_price;
    }));

    svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", line)
      .style("stroke",this.state.color);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisTop(xScale)
        .tickFormat(d3.timeFormat("%Y-%m-%d")));
    svg.append("g")
      .call(d3.axisRight(yScale));

    svg.append("g")
      .selectAll(".dot")
      .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("cx", line.x())
        .attr("cy", line.y())
        .attr("r", radius)
        .style("fill",this.state.color)
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut)
    //EventHandler
    function handleMouseOver(d,i) {
      d3.select(this)
        .attr("r",radius*3);

      let text=svg.append("g")
        .attr("id",`smpdot-${i}`);

      text.append("rect")
        .attr("width",100)
        .attr("height",40)
        .attr("style","fill:white;stroke-width:3;stroke:black")
        .attr("x",function(){return xScale(d.date) - 35; })
        .attr("y",function(){return yScale(d.total_price)-50; })

      text.append("text")
        .attr("x",function(){return xScale(d.date) - 30; })
        .attr("y",function(){return yScale(d.total_price) - 30; })
        .text(function(){
          return ( ` ${d.date.getFullYear()}-${d.date.getMonth()+1}-${d.date.getDate()}`)
        })

      text.append("text")
        .attr("x",function(){return xScale(d.date) - 30; })
        .attr("y",function(){return yScale(d.total_price) - 15; })
        .text(function(){
              return ( `${d.total_price}원`);
        })
    }

    function handleMouseOut(d, i) {
      d3.select(this)
        .attr("r",radius);
      d3.select(`#smpdot-${i}`).remove(); // Remove text location
    }
    
    //Legend
    let legendbox=svg.append('g').selectAll()
        .data([this.state.color])
          .enter().append("rect")
          .attr("width",10)
          .attr("height",10)
          .attr("fill",function(d){
            return d;
          })
          .attr("transform",function(d,i){
            return "translate("+(legend.left+10) +","+ (legend.bottom-i*legend.width)+")"
          });

      let legendtext=svg.append('g').selectAll()
          .data([this.state.legend])
            .enter().append('text')
            .text(function(d){
                return d;
              })
            .attr("transform",function(d,i){
              return "translate("+(legend.left+30) +","+ (legend.bottom-i*legend.width+10)+")"
            });
  }

  handleClick(e){
     d3.selectAll("#SmpChartA > *").remove();
     let startQuery= e.target.value;
     let endDate=new Date();
     let endQuery= `${endDate.getFullYear()}-${endDate.getMonth()+1}-${endDate.getDay()}`;
     console.log(startQuery,endQuery)

     fetch(`/smp_data/total_price/${startQuery}/${endQuery}`).then(
       response => {
       	if (response.ok) {
          return response.json();
         }
         throw new Error('Request failed!');
       }, networkError => {
         console.log(networkError.message);
       }).then(jsonResponse => this.chartdraw(jsonResponse));
  }
  componentDidMount() {
    fetch(`/smp_data/total_price/2010-01-01/2100-12-31`).then(
      response => {
       if (response.ok) {
         return response.json();
        }
        throw new Error('Request failed!');
      }, networkError => {
        console.log(networkError.message);
      }).then(jsonResponse => this.chartdraw(jsonResponse));
  }
  render(){
    return(
      <div>
          <TimeButton buttonName="전체(2001년 이후)" buttonValue="2001-01-01" onClick={this.handleClick} />
          <TimeButton buttonName="2010년 이후" buttonValue="2010-01-01" onClick={this.handleClick} />
          <TimeButton buttonName="2015년 이후" buttonValue="2015-01-01" onClick={this.handleClick} />
        <svg id="SmpChartA"></svg>
      </div>
    )
  }
}

export class RecChartA extends React.Component{
  constructor(props){
    super(props);
    this.state={
      color:["blue","red","yellow"],
      legend:["평균가(종가)","최고가","최저가"]
    };
    this.handleClick=this.handleClick.bind(this);
    this.chartdraw=this.chartdraw.bind(this)
  }

  chartdraw(data){
    let parseTime = d3.timeParse("%Y-%m-%d");
    let margin ={top:20, right:20,bottom:30,left:50},
      width=1000,
      height=1000;
    let legend={bottom:height-100,left:50,width:20};
    let radius=5;

    let xScale=d3.scaleTime().range([margin.left,width-margin.right]);
    let yScale=d3.scaleLinear().range([height-margin.top,margin.bottom]);

    let average_line=d3.line()
      .defined(function(d) { return d.average_price; })
      .x(function(d){return xScale(d.date)})
      .y(function(d){return yScale(d.average_price)});

    let lowest_line=d3.line()
      .defined(function(d) { return d.lowest_price; })
      .x(function(d){return xScale(d.date)})
      .y(function(d){return yScale(d.lowest_price)});

    let highest_line=d3.line()
      .defined(function(d) { return d.highest_price; })
      .x(function(d){return xScale(d.date)})
      .y(function(d){return yScale(d.highest_price)});

    let svg=d3.select("#RecChartA")
      .attr("width",width + margin.left + margin.right)
      .attr("height",height + margin.top + margin.bottom)
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('viewBox', '0 0 ' + (width + margin.left + margin.right) + ' ' + (height + margin.top + margin.bottom));

    data.forEach(function(d){d.date=parseTime(d.date)});
    xScale.domain(d3.extent(data,function(d){
      return d.date;
    }));
    yScale.domain([d3.min(data,function(d){
      return Math.min(d.lowest_price,d.average_price,d.highest_price)|| Infinity;
    }),d3.max(data,function(d){
      return Math.max(d.lowest_price,d.average_price,d.highest_price);
    })]);

    svg.append("path")
      .data([data])
      .attr("class", "line")
      .style("stroke",this.state.color[0])
      .attr("d", average_line);

    svg.append("path")
      .data([data])
      .attr("class", "line")
      .style("stroke",this.state.color[1] )
      .attr("d", highest_line);

    svg.append("path")
      .data([data])
      .attr("class", "line")
      .style("stroke", this.state.color[2])
      .attr("d", lowest_line);

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisTop(xScale)
        .tickFormat(d3.timeFormat("%Y-%m-%d")));

    svg.append("g")
      .call(d3.axisRight(yScale));

    svg.append("g")
      .selectAll(".dot1")
      .data(data.filter(function(d){return d.average_price}))
      .enter().append("circle")
        .attr("class", "dot")
        .attr("cx", average_line.x())
        .attr("cy", average_line.y())
        .attr("r", radius)
        .style("fill",this.state.color[0])
        .on("mouseover", handleMouseOver1)
        .on("mouseout", handleMouseOut);

    function handleMouseOver1(d,i) {
      d3.select(this)
        .attr("r",radius*3);
      notice(d.date,d.average_price,i)
    }

    svg.append("g")
      .selectAll(".dot2")
      .data(data.filter(function(d){return d.highest_price}))
      .enter().append("circle")
        .attr("class", "dot")
        .attr("cx", highest_line.x())
        .attr("cy", highest_line.y())
        .attr("r", radius)
        .style("fill",this.state.color[1])
        .on("mouseover", handleMouseOver2)
        .on("mouseout", handleMouseOut);

    function handleMouseOver2(d,i) {
      d3.select(this)
        .attr("r",radius*3);
      notice(d.date,d.highest_price,i)
    }

    svg.append("g")
      .selectAll(".dot3")
      .data(data.filter(function(d){return d.lowest_price}))
      .enter().append("circle")
        .attr("class", "dot")
        .attr("cx", lowest_line.x())
        .attr("cy", lowest_line.y())
        .attr("r", radius)
        .style("fill",this.state.color[2])
        .on("mouseover", handleMouseOver3)
        .on("mouseout", handleMouseOut);

    function handleMouseOver3(d,i) {
      d3.select(this)
        .attr("r",radius*3);
      notice(d.date,d.lowest_price,i)
    }

    function notice(x,y,i){
      svg.append("text")
        .attr("id",`recdot-${i}`)
        .attr("x",function(){return xScale(x) - 30; })
        .attr("y",function(){return yScale(y) - 15; })
        .text(function(){
          return ( `시기: ${x.getFullYear()}-${x.getMonth()+1}-${x.getDate()}, 가격: ${y}`);
        })
    }
    function handleMouseOut(d, i) {
        d3.select(this)
          .attr("r",radius);
        d3.select(`#recdot-${i}`).remove(); // Remove text location
    }

    let legendbox=svg.append('g').selectAll()
      .data(this.state.color)
      .enter().append("rect")
      .attr("width",10)
      .attr("height",10)
      .attr("fill",function(d){
        return d;
      })
      .attr("transform",function(d,i){
        return "translate("+(legend.left+10) +","+ (legend.bottom-i*legend.width)+")"
      });

    let legendtext=svg.append('g').selectAll()
      .data(this.state.legend)
      .enter().append('text')
      .text(function(d){
          return d;
      })
      .attr("transform",function(d,i){
        return "translate("+(legend.left+30) +","+ (legend.bottom-i*legend.width+10)+")"
      });
  }

  handleClick(e){
    d3.selectAll("#RecChartA > *").remove();
    let land=e.target.value;
    fetch(`/rec_data1/average_price/lowest_price/highest_price/${land}`).then(
      response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request failed!');
      }, networkError => {
         console.log(networkError.message);
      }).then(jsonResponse => this.chartdraw(jsonResponse));
  }

  componentDidMount() {
    fetch(`/rec_data1/average_price/lowest_price/highest_price/total`).then(
      response => {
       if (response.ok) {
         return response.json();
        }
        throw new Error('Request failed!');
      }, networkError => {
        console.log(networkError.message);
      }).then(jsonResponse => this.chartdraw(jsonResponse));
  }
  render(){
    return(
      <div>
          <TimeButton buttonName="제주" buttonValue="jeju" onClick={this.handleClick} />
          <TimeButton buttonName="육지" buttonValue="land" onClick={this.handleClick} />
          <TimeButton buttonName="통합" buttonValue="total" onClick={this.handleClick} />
        <svg id="RecChartA"></svg>
      </div>
    )
  }
}

export class TimeButton extends React.Component{
  render(){
    return(
      <button className="mdl-button mdl-js-button mdl-button--accent" value={this.props.buttonValue} onClick={this.props.onClick}>
          {this.props.buttonName}
      </button>
    )
  }
}
/*
constructor(props){
  super(props);
  this.state={
    startDate: new Date(),
    endDate: new Date()
  };
}
initiateDate(e){
  let date={
    startDate:new Date(),
    endDate:new Date()
  }
  date.startDate.setDate(date.startDate.getDate()-e)
  return date;
}
handleClick(){
  let date=this.initiateDate(parseInt(this.props.dayMinus));
  this.setState({
    startDate:date.startDate,
    endDate:date.endDate
  })
  let startDateQuery= `${this.state.startDate.getFullYear()}-${this.state.startDate.getMonth()+1}-${this.state.startDate.getDate()}`;
  let endDateQuery= `${this.state.endDate.getFullYear()}-${this.state.endDate.getMonth()+1}-${this.state.endDate.getDate()}`;
}
*/
/*
const parseTime = d3.timeParse("%Y-%m-%d");
const margin ={top:20, right:20,bottom:30,left:50},
  width=1000,
  height=1000;

const xScale=d3.scaleTime().range([margin.left,width-margin.right]);
const yScale=d3.scaleLinear().range([height-margin.top,margin.bottom]);
const line=d3.line()
  .x(function(d){return xScale(d.date)})
  .y(function(d){return yScale(d.average_price)});

function chartdraw(data){
const parseTime = d3.timeParse("%Y-%m-%d");
const margin ={top:20, right:20,bottom:30,left:50},
  width=1000,
  height=1000;

const xScale=d3.scaleTime().range([margin.left,width-margin.right]);
const yScale=d3.scaleLinear().range([height-margin.top,margin.bottom]);
const line=d3.line()
  .x(function(d){return xScale(d.date)})
  .y(function(d){return yScale(d.average_price)});

    d3.selectAll("svg > *").remove();
    const recSvg=d3.select("#svg")
      .attr("width",width + margin.left + margin.right)
      .attr("height",height + margin.top + margin.bottom)

    data.forEach(function(d){d.date=parseTime(d.date)});
    xScale.domain(d3.extent(data,function(d){
      return d.date;
    }));
    yScale.domain(d3.extent(data,function(d){
      return d.average_price;
    }));

    recSvg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", line);

    recSvg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisTop(xScale)
        .tickFormat(d3.timeFormat("%Y-%m-%d")));
    recSvg.append("g")
      .call(d3.axisRight(yScale));
    recSvg.attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('viewBox', '0 0 ' + (width + margin.left + margin.right) + ' ' + (height + margin.top + margin.bottom));
    console.log(data);
}

function smpGraph(id){
  let startDate = new Date();
  let endDate = new Date();

  switch(id){
    case "smpTotal":
      startDate.setDate(startDate.getDate()-100000)
      break;
    case "smpOneyear":
      startDate.setDate(startDate.getDate()-365);
      break;
    case "smpSixmonth":
      startDate.setDate(startDate.getDate()-180);
      break;
    case"smpThreemonth":
      startDate.setDate(startDate.getDate()-90);
      break;
  }

  let startDateQuery= `${startDate.getFullYear()}-${startDate.getMonth()+1}-${startDate.getDay()}`;
  let endDateQuery= `${endDate.getFullYear()}-${endDate.getMonth()+1}-${endDate.getDay()}`;
  fetch(`http://www.fermi.me/rec_data/average_price/${startDateQuery}/${endDateQuery}/total`).then(
  response => {
  	if (response.ok) {
     return response.json();
    }
    throw new Error('Request failed!');
  }, networkError => {
    console.log(networkError.message);
  }).then(jsonResponse => chartdraw(jsonResponse));
}*/
