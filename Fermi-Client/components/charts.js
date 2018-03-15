import React from 'react';
const d3=require("d3");

export class SmpChartA extends React.Component{
  constructor(props){
    super(props);
    this.state={
      startDate: new Date("1990-05-05"),
      endDate: new Date()
    };
    this.handleClick=this.handleClick.bind(this);
    this.chartdraw=this.chartdraw.bind(this)
  }

  chartdraw(data){
    let parseTime = d3.timeParse("%Y-%m-%d");
    let margin ={top:20, right:20,bottom:30,left:50},
      width=1000,
      height=500;

    let xScale=d3.scaleTime().range([margin.left,width-margin.right]);
    let yScale=d3.scaleLinear().range([height-margin.top,margin.bottom]);
    let line=d3.line()
      .x(function(d){return xScale(d.date)})
      .y(function(d){return yScale(d.total_price)});

    let recSvg=d3.select("#SmpChartA")
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
  }

  handleClick(e){
     d3.selectAll("#SmpChartA > *").remove();
     let dayMinus=parseInt(e.target.value);
     let today=new Date()
     today.setDate(today.getDate()-dayMinus)
     this.setState({
       startDate: today
     })

     let startQuery= `${this.state.startDate.getFullYear()}-${this.state.startDate.getMonth()+1}-${this.state.startDate.getDay()}`;
     let endQuery= `${this.state.endDate.getFullYear()}-${this.state.endDate.getMonth()+1}-${this.state.endDate.getDay()}`;
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
    let startQuery= `${this.state.startDate.getFullYear()}-${this.state.startDate.getMonth()+1}-${this.state.startDate.getDay()}`;
    let endQuery= `${this.state.endDate.getFullYear()}-${this.state.endDate.getMonth()+1}-${this.state.endDate.getDay()}`;
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
  render(){
    return(
      <div>
          <TimeButton buttonName="전체" buttonValue="10000" onClick={this.handleClick} />
          <TimeButton buttonName="최근 3년" buttonValue="1095" onClick={this.handleClick} />
          <TimeButton buttonName="최근 1년" buttonValue="365" onClick={this.handleClick} />
          <TimeButton buttonName="최근 6개월" buttonValue="180" onClick={this.handleClick} />
        <svg id="SmpChartA"></svg>
      </div>
    )
  }
}

export class RecChartA extends React.Component{
  constructor(props){
    super(props);
    this.state={
      startDate: new Date("1990-05-05"),
      endDate: new Date()
    };
    this.handleClick=this.handleClick.bind(this);
    this.chartdraw=this.chartdraw.bind(this)
  }

  chartdraw(data){
    let parseTime = d3.timeParse("%Y-%m-%d");
    let margin ={top:20, right:20,bottom:30,left:50},
      width=1000,
      height=500;

    let xScale=d3.scaleTime().range([margin.left,width-margin.right]);
    let yScale=d3.scaleLinear().range([height-margin.top,margin.bottom]);
    let line=d3.line()
      .x(function(d){return xScale(d.date)})
      .y(function(d){return yScale(d.average_price)});


    let recSvg=d3.select("#RecChartA")
      .attr("width",width + margin.left + margin.right)
      .attr("height",height + margin.top + margin.bottom)
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('viewBox', '0 0 ' + (width + margin.left + margin.right) + ' ' + (height + margin.top + margin.bottom));

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
  }

  handleClick(e){
     d3.selectAll("#RecChartA > *").remove();
     let dayMinus=parseInt(e.target.value);
     let today=new Date()
     today.setDate(today.getDate()-dayMinus)
     this.setState({
       startDate: today
     })

     let startQuery= `${this.state.startDate.getFullYear()}-${this.state.startDate.getMonth()+1}-${this.state.startDate.getDay()}`;
     let endQuery= `${this.state.endDate.getFullYear()}-${this.state.endDate.getMonth()+1}-${this.state.endDate.getDay()}`;

     fetch(`/rec_data/average_price/${startQuery}/${endQuery}/total`).then(
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
    let startQuery= `${this.state.startDate.getFullYear()}-${this.state.startDate.getMonth()+1}-${this.state.startDate.getDay()}`;
    let endQuery= `${this.state.endDate.getFullYear()}-${this.state.endDate.getMonth()+1}-${this.state.endDate.getDay()}`;
    fetch(`/rec_data/average_price/${startQuery}/${endQuery}/total`).then(
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
          <TimeButton buttonName="전체" buttonValue="10000" onClick={this.handleClick} />
          <TimeButton buttonName="6개월전" buttonValue="180" onClick={this.handleClick} />
          <TimeButton buttonName="3개월전" buttonValue="90" onClick={this.handleClick} />
          <TimeButton buttonName="1개월전" buttonValue="30" onClick={this.handleClick} />
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
