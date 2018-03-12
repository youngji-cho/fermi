import React from 'react';
export class Chart extends React.Component{
  render(){
  }
}

export class TimeButton extends React.Component{
  constructor(props){
    super(props);
    this.state={
      startDate: '',
      endDate: ''
    };
    this.handleClick=this.handleClick.bind(this);
    this.initiateDate=this.initiateDate.bind(this);
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
  render(){
    return(
      <button className="mdl-button mdl-js-button mdl-button--accent" onClick={this.handleClick}>
        {this.props.buttonName}
      </button>
    )
  }
}

/*
let startDate = new Date();
let endDate = ;

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

*/
