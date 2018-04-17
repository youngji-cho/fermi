import React from 'react';
import {Layout,Header,Drawer,Board} from '../components/layout';
import {withRouter} from "react-router-dom";

export class SimulationInput extends React.Component{
  constructor(props){
    super(props);
    this.state={
      type:["지상형","옥상형","지상형"],
      scene:["긍정","보통","부정"]
    };
    this.handleSubmit=this.handleSubmit.bind(this)
  }
  handleSubmit(e){
    e.preventDefault();
    console.log(e.target[5].value)
    let id =new Date().getTime().toString();
    fetch("/economic/result",{
      method: 'POST',
      headers : {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        time:String(new Date()),
        title:e.target[0].value,
        location:e.target[1].value,
        size:e.target[2].value,
        weight: e.target[3].value,
        type:e.target[4].value,
        scene:e.target[5].value})
      })
      .then(response=>{
      if (response.ok){
          return response.json();
        }
        throw new Error('Request failed!');
      }, networkError=> console.log(networkError.message))
      .then(
      jsonResponse=>{
      console.log(jsonResponse)
    });
    this.props.history.push(`/economic/${id}`);
  }
  render(){
    let type_table= this.state.type.map((d,i)=>
      <option key={`${i}`}value={d}>{d}</option>
    );
    let scene_table= this.state.scene.map((d,i)=>
      <option key={`${i}`}value={d}>{d}</option>
    );
    return(
      <Board name="경제성 분석 시뮬레이션">
        <p>경제성분석 시나리오입니다. 다음값을 입력하시면 자동으로 시뮬레이션을 해드립니다.</p>
        <form method="post" onSubmit={this.handleSubmit}>
          제목: <input type="text" /> <br />
          위치: <input type="text" /> <br />
          용량: <input type="text" /> <br />
          가중치: <input type="text" /> <br />
          형태: <select name="selected">{type_table}</select><br />
          시나리오: <select name="selected">{scene_table}</select><br />
          <input type="submit" value="Submit" />
        </form>
      </Board>
    )
  }
}

export class SimulationOutput extends React.Component{
  constructor(props){
    super(props);
    this.state={
      data:[]
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
        console.log(jsonResponse)
      })
  }
  render(){
    return(
      <Board name="경제성 분석 시뮬레이션">
        <p>{this.props.match.params.id}</p>
      </Board>
    )
  }
}
