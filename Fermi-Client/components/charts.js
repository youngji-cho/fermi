import React from 'react';
import {TimeButton} from './layout';
const d3=require('d3');
//graph색깔 :http://ksrowell.com/blog-visualizing-data/2012/02/02/optimal-colors-for-graphs/
export class SmpChartA extends React.Component{
  constructor(props){
    super(props);
    this.state={
      color:"rgb(57,106,177)",
      legend:"SMP 월간가중평균가격",
      data:[]
    };
    this.handleClick=this.handleClick.bind(this);
    this.chartDraw=this.chartDraw.bind(this)
  }
  chartDraw(data){
    let margin ={top:50, right:50,bottom:50,left:50},
      width=1000,
      height=700;
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
      notice("SMP",d.date,d.total_price,i);
    }
    function handleMouseOut(d, i) {
      d3.select(this)
        .attr("r",radius);
      d3.select(`#SMPdot-${i}`).remove(); // Remove text location
    }

    let last=data.length-1;
    notice("SMP최신",data[last].date,data[last].total_price);

    function notice(subject,x,y,i){
      let text=svg.append("g")
        .attr("id",`${subject}dot-${i}`);
      text.append("rect")
        .attr("width",150)
        .attr("height",40)
        .attr("style","fill:white;stroke-width:3;stroke:black")
        .attr("x",function(){return xScale(x) - 35; })
        .attr("y",function(){return yScale(y)-50; })
      text.append("text")
        .attr("x",function(){return xScale(x) - 30; })
        .attr("y",function(){return yScale(y) - 30; })
        .text(function(){
          return ( ` ${x.getFullYear()}년 ${x.getMonth()+1}월 ${x.getDate()}일`)
        })
      text.append("text")
        .attr("x",function(){return xScale(x) - 30; })
        .attr("y",function(){return yScale(y) - 15; })
        .text(function(){
              return ( `${subject}가격:${y}원`);
        })
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
     let startDate= new Date(e.target.value);
     let endDate=new Date();
     let data=this.state.data.filter((x)=>{
        return startDate<x.date && x.date<endDate
     });
     this.chartDraw(data)
  }
  componentDidMount() {
    fetch(`/energy_data/smp_price`).then(
      response => {
       if (response.ok) {
         return response.json();
        }
        throw new Error('Request failed!');
      }, networkError => {
        console.log(networkError.message);
      }).then(jsonResponse =>{
        let data=jsonResponse.map((x)=>{return {"date":new Date(x.date),"total_price":x.total_price}})
        this.setState({data:data})
        this.chartDraw(data);
      })
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
      color:["rgb(204,37,41)"],
      legend:["평균가(종가)"],
      data:[]
    };
    this.handleClick=this.handleClick.bind(this);
    this.chartDraw=this.chartDraw.bind(this)
  }
  chartDraw(data){
    let margin ={top:50, right:50,bottom:50,left:50},
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
    let svg=d3.select("#RecChartA")
      .attr("width",width + margin.left + margin.right)
      .attr("height",height + margin.top + margin.bottom)
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('viewBox', '0 0 ' + (width + margin.left + margin.right) + ' ' + (height + margin.top + margin.bottom));

    xScale.domain(d3.extent(data,function(d){
      return d.date;
    }));
    yScale.domain([d3.min(data,function(d){
      return /*Math.min(d.lowest_price,*/d.average_price/*,d.highest_price)*/|| Infinity;
    }),d3.max(data,function(d){
      return /*Math.max(d.lowest_price,*/d.average_price/*,d.highest_price)*/;
    })]);
    svg.append("path")
      .data([data])
      .attr("class", "line")
      .style("stroke",this.state.color[0])
      .attr("d", average_line);
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
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut);

    function handleMouseOver(d,i) {
      d3.select(this)
        .attr("r",radius*3);
      notice("REC",d.date,d.average_price,i);
    }
    let last=(data.length-1);
    notice("REC최신",data[last].date,data[last].average_price);

    function notice(subject,x,y,i){
      let text=svg.append("g")
        .attr("id",`${subject}dot-${i}`);
      text.append("rect")
        .attr("width",150)
        .attr("height",40)
        .attr("style","fill:white;stroke-width:3;stroke:black")
        .attr("x",function(){return xScale(x) - 35; })
        .attr("y",function(){return yScale(y)-50; })
      text.append("text")
        .attr("x",function(){return xScale(x) - 30; })
        .attr("y",function(){return yScale(y) - 30; })
        .text(function(){
          return ( `${x.getFullYear()}년 ${x.getMonth()+1}월 ${x.getDate()}일`)
        })
      text.append("text")
        .attr("x",function(){return xScale(x) - 30; })
        .attr("y",function(){return yScale(y) - 15; })
        .text(function(){
              return ( `${subject}가격:${y}원`);
        })
    }
    function handleMouseOut(d, i) {
      d3.select(this)
        .attr("r",radius);
      d3.select(`#RECdot-${i}`).remove(); // Remove text location
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
    let parsedData=this.state.data.filter((x)=>{
      return x.land_or_jeju ===land
    });
    this.chartDraw(parsedData);
  }
  componentDidMount() {
    fetch(`/energy_data/rec_price`).then(
      response => {
       if (response.ok) {
         return response.json();
        }
        throw new Error('Request failed!');
      }, networkError => {
        console.log(networkError.message);
      }).then(jsonResponse =>{
        let data=jsonResponse.map((x)=>{
          return { "date":new Date(x.date),"land_or_jeju":x.land_or_jeju,
          "average_price":x.average_price,"lowest_price":x.lowest_price,"highest_price":x.highest_price}
        });
        this.setState({data:data});
        console.log(this.state);
        let parsedData=data.filter((x)=>{
          return x.land_or_jeju ==="total"
        });
        this.chartDraw(parsedData);
        ;
      });
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
