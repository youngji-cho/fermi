import React from 'react';
import {Layout,Header,Drawer,Board,TimeButton} from './layout';
import {withRouter} from "react-router-dom";
import {datechange,datechangeMonth,datechangeDate} from "../../util";
import Calendar from 'react-calendar';

export class SimulationInput extends React.Component{
  constructor(props){
    super(props);
    let today= new Date();
    this.state={
      success:false,
      loading:false,
      startdate:new Date(today.setMonth(today.getMonth()+2)),
      year:15,
      size:99,
      weight:1.2,
      average_time:3.4,
      type:"month",
      scene:"lm_model",
      plant:"solar",
      typelist:[{in:"month",out:"월간"}],
      scenelist:[{in:"lm_model",out:"보통"}],
      plantlist:[{in:"solar",out:"태양광"}]
    };
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleDateChange=this.handleDateChange.bind(this);
    this.handleYearChange=this.handleYearChange.bind(this);
    this.handleSizeChange=this.handleSizeChange.bind(this);
    this.handleWeightChange=this.handleWeightChange.bind(this);
    this.handleAverageTimeChange=this.handleAverageTimeChange.bind(this);
    this.handleSceneChange=this.handleSceneChange.bind(this);
    this.handleTypeChange=this.handleTypeChange.bind(this);
    this.handlePlantChange=this.handlePlantChange.bind(this);
  }
  handleSubmit(){
    if (5<=this.state.year && this.state.year <=40 && 0<this.state.size && 0.5<=this.state.weight && this.state.weight<=5 && 0<this.state.average_time && this.state.average_time<=24){
      this.setState({loading:true});
      let id =new Date().getTime().toString();
      console.log(this.state)
      fetch("/economic/result",{
        method: 'POST',
        headers : {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: id,
          startdate:this.state.startdate,
          year:this.state.year,
          size:this.state.size,
          weight: this.state.weight,
          averagetime: this.state.average_time,
          scenario:this.state.scene,
          type:this.state.type
          })
        })
        .then(response=>{
          if (response.ok){
            return response.json();
          }
          throw new Error('Request failed!');
        }, networkError=> {
          alert("네트워크에 문제가 있었습니다.")
          this.setState({loading:false});
          console.log(networkError.message)
        })
        .then(jsonResponse=>{
          let {success} = jsonResponse;
          this.setState({success});
          {this.state.success &&this.props.history.push(`/economic/${id}`)};
      });
    }
    else if(this.state.year<5){
      alert("예측 기간은 5년 초과이어야 합니다.")
    }
    else if(40<this.state.year){
      alert("예측 기간은 40년 미만이어야 합니다.")
    }
    else if(this.state.weight<0.5){
      alert("REC가중치는 0.5 이상이어야 합니다.")
    }
    else if(5<this.state.weight){
      alert("REC가중치는 5 이하야 합니다.")
    }
    else if(24<this.state.average_time){
      alert("평균발전 시간은 24시간 이하여야 합니다.")
    }
    else{
      alert("입력오류입니다.(예: 숫자입력부분에 문자입력, 음수 입력, 0입력)")
    }
  }
  handleDateChange(e){
    this.setState({startdate:e})
  }
  handleYearChange(e){
    this.setState({year:e.target.value})
  }
  handleSizeChange(e){
    this.setState({size:e.target.value})
  }
  handleWeightChange(e){
    this.setState({weight:e.target.value})
  }
  handleAverageTimeChange(e){
    this.setState({average_time:e.target.value})
  }
  handleSceneChange(e){
    this.setState({scene:e.target.value})
  }
  handleTypeChange(e){
    this.setState({type:e.target.value})
  }
  handlePlantChange(e){
    this.setState({plant:e.target.value})

  }
  render(){
    let content=<div></div>
    let type_table= this.state.typelist.map((d,i)=>
      <option key={`${i}`} value={d.in}>{d.out}</option>
    );
    let scene_table= this.state.scenelist.map((d,i)=>
      <option key={`${i}`} value={d.in}>{d.out}</option>
    );
    let plant_table= this.state.plantlist.map((d,i)=>
      <option key={`${i}`} value={d.in}>{d.out}</option>
    );
    if (this.state.loading) {
      content=(<h1>Loading...</h1>);
    } else {
      content=(
        <div>
        <div className="simul_form" >재무예측기간: <input  type="text" onChange={this.handleYearChange} value={this.state.year} /></div>
        <div className="simul_form" >발전소 크기(kw): <input type="text" onChange={this.handleSizeChange} value={this.state.size} /> </div>
        <div className="simul_form"> REC 가중: <input type="text" className="simul_form" onChange={this.handleWeightChange} value={this.state.weight} /></div>
        <div className="simul_form">평균발전시간: <input type="text" onChange={this.handleAverageTimeChange} value={this.state.average_time} /></div>
        <div className="simul_form"> 시나리오: <select name="selected" onChange={this.handleSceneChange}>{scene_table}</select></div>
        <div className="simul_form"> 재무분석결과방식: <select name="selected" onChange={this.handleTypeChange}>{type_table}</select></div>
        <div className="simul_form"> 발전방식: <select name="selected" onChange={this.handlePlantChange}>{plant_table}</select></div>
        <div className="simul_form"> 발전소 운영시작 시기: {datechangeDate(this.state.startdate)} </div>
        <div><Calendar onChange={this.handleDateChange} value={this.state.startdate} /></div>
        <button onClick={this.handleSubmit} className="mdl-button mdl-js-button mdl-button--raised">분석시작</button>
        </div>
      )
    }
    return(
    <Board name="시뮬레이션 입력">
      <p> 발전소 시뮬레이션입니다. 다음값을 입력하시면 자동으로 시뮬레이션을 해드립니다.</p>
      {content}
    </Board>)
  }
}

export class SimulationOutput extends React.Component{
  constructor(props){
    super(props);
    this.state={
      data:[],
      loading:true
    };
  }
  componentDidMount(){
    fetch(`/economic/result/${this.props.match.params.id}`).then(
      response => {
       if (response.ok) {
         return response.json();
        }
        throw new Error('Request failed!');
      }, networkError => {
        console.log(networkError.message);
      }).then(jsonResponse =>{
        this.setState({data:jsonResponse})
        this.setState({loading:false})
      })
  }
  render(){
    let table="";let column=""; let smp_price="";let rec_price="";let smp_revenue="";let rec_revenue="";let days="";let total_cost="";
    if(this.state.loading) {
      table=(<h1>Loading...</h1>)
    } else {
      let data = this.state.data.Item.response;
      data.map((d,i)=>{
        data[i].time=datechangeMonth(d.date.start_time)
       }
      )
      column=data.map((d,i)=>
        <th key={`date(${i})`}>{d.time}</th>
      )
      smp_price= data.map((d,i)=>
        <td key={`smp_price(${i})`}>{d.smp_price}</td>
      )
      rec_price= data.map((d,i)=>
        <td key={`rec_price(${i})`}>{d.smp_price}</td>
      )
      smp_revenue=data.map((d,i)=>
        <td key={`smp_revenue(${i})`}>{d.smp_revenue}</td>
      )
      rec_revenue=data.map((d,i)=>
        <td key={`rec_revenue(${i})`}>{d.rec_revenue}</td>
      )
      total_cost=data.map((d,i)=>
        <td key={`total_cost(${i})`}>{d.total_cost}</td>
      )
      days=data.map((d,i)=>
        <td key={`days(${i})`}>{d.days}</td>
      )
      table=(
        <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp" >
        <thead>
          <tr>
            <th>기간</th>
            {column}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>예상 SMP 가격</td>
            {smp_price}
          </tr>
          <tr>
            <td>예상 REC 가격</td>
            {rec_price}
          </tr>
          <tr>
            <td>예상 SMP 수입</td>
            {smp_revenue}
          </tr>
          <tr>
            <td>예상 REC 수입</td>
            {rec_revenue}
          </tr>
          <tr>
            <td>운영비용</td>
            {total_cost}
          </tr>
          <tr>
            <td>운영기간</td>
            {days}
          </tr>
        </tbody>
        </table>
      )
    }
    return(
      <Board name="시뮬레이션 결과">
        {table}
      </Board>
    )
  }
}
