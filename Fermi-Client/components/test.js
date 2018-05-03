import React from 'react';
import {Layout,Header,Drawer,Board} from '../components/layout';
import {withRouter} from "react-router-dom";
import {datechange,datechangeMonth} from "../../util";
import Calendar from 'react-calendar';

export class TestForm extends React.Component{
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
      typelist:[{in:"month",out:"월간"},{in:"year",out:"연간"}],
      scenelist:[{in:"lm_model",out:"보통"},{in:"lm_model_worse",out:"최악"}]
    };
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleDateChange=this.handleDateChange.bind(this);
    this.handleYearChange=this.handleYearChange.bind(this);
    this.handleSizeChange=this.handleSizeChange.bind(this);
    this.handleWeightChange=this.handleWeightChange.bind(this);
    this.handleAverageTimeChange=this.handleAverageTimeChange.bind(this);
    this.handleSceneChange=this.handleSceneChange.bind(this);
    this.handleTypeChange=this.handleTypeChange.bind(this);
  }
  handleSubmit(){
    if (5<=this.state.year && this.state.year <=40 && 0<=this.state.size && 0.5<=this.state.weight && this.state.weight<=5 && 0<=this.state.average_time && this.state.average_time<=24){
      this.setState({loading:true});
      e.preventDefault();
      let id =new Date().getTime().toString();
      console.log(this.state)
      fetch("/economic/result",{
        method: 'POST',
        headers : {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: id,
          startdate:e.target[0].value,
          year:e.target[1].value,
          size:e.target[2].value,
          weight: e.target[3].value,
          averagetime: e.target[4].value,
          scenario:e.target[5].value,
          type:e.target[6].value
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
      this.props.history.push(`/test`)
    }
    else if(40<this.state.year){
      alert("예측 기간은 40년 미만이어야 합니다.")
      this.props.history.push(`/test`)
    }
    else if(this.state.weight<0.5){
      alert("REC가중치는 0.5 이상이어야 합니다.")
      this.props.history.push(`/test`)
    }
    else if(5<this.state.weight){
      alert("REC가중치는 5 이하야 합니다.")
      this.props.history.push(`/test`)
    }
    else if(24<this.state.average_time){
      alert("평균발전 시간은 24시간 이하여야 합니다.")
      this.props.history.push(`/test`)
    }
    else{
      alert("입력오류입니다.(예: 숫자입력부분에 문자입력, 음수 입력)")
      this.props.history.push(`/test`)
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
  render(){
    let content=<div></div>
    let type_table= this.state.typelist.map((d,i)=>
      <option key={`${i}`} value={d.in}>{d.out}</option>
    );
    let scene_table= this.state.scenelist.map((d,i)=>
      <option key={`${i}`} value={d.in}>{d.out}</option>
    );
    if (this.state.loading) {
      content=(<h1>Loading...</h1>);
    } else {
      content=(
      <form method="post" onSubmit={this.handleSubmit}>
        발전소 운영시작 시기: {datechangeMonth(this.state.startdate)} <br />
        <Calendar onChange={this.handleDateChange} value={this.state.startdate} />
        재무예측기간: <input type="text" onChange={this.handleYearChange} value={this.state.year} /> <br />
        발전소 크기(kw): <input type="text" onChange={this.handleSizeChange} value={this.state.size} /> <br />
        REC 가중: <input type="text" onChange={this.handleWeightChange} value={this.state.weight} /> <br />
        평균발전시간: <input type="text" onChange={this.handleAverageTimeChange} value={this.state.average_time} /> <br /><br />
        시나리오: <select name="selected" onChange={this.handleSceneChange}>{scene_table}</select>
        재무분석결과방식: <select name="selected" onChange={this.handleTypeChange}>{type_table}</select><br /><br />
        <input type="submit" defaultValue="분석시작" />
      </form>
      )
    }
    return(
    <Board name="경제성 분석 시뮬레이션">
      <p>경제성분석 시나리오입니다. 다음값을 입력하시면 자동으로 시뮬레이션을 해드립니다.</p>
      {content}
    </Board>)
  }
}
/*

handleSubmit(e){

}

*/
