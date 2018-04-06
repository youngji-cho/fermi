import React from 'react';
import {Layout,Header,Drawer,Board} from '../components/layout';
import {withRouter} from "react-router-dom";

export class SimulationInput extends React.Component{
  constructor(props){
    super(props);
    this.state={
      type:["지상형","옥상형","지상형"],
      value:{test:"test"}
    };
    this.handleSubmit=this.handleSubmit.bind(this)
  }

  handleSubmit(e){
    e.preventDefault();
    console.log(e.target[0].value,e.target[1].value,e.target[2].value)
    fetch("/economic/result",{
      method: 'POST',
      headers : {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title:e.target[0].value,
        size:e.target[1].value,
        type:e.target[2].value
      })
      }).then(response=>{
      if (response.ok){
          return response.json();
        }
        throw new Error('Request failed!');
      }, networkError=> console.log(networkError.message)
    ).then(
      jsonResponse=>{
      console.log(jsonResponse)
    });
    this.props.history.push(`/result`);
  }
  render(){
    let type_table= this.state.type.map((d,i)=>
      <option key={`${i}`}value={d}>{d}</option>
    );
    return(
      <Board name="경제성 분석 시뮬레이션">
        <p>경제성분석 시나리오입니다. 다음값을 입력하시면 자동으로 시뮬레이션을 해드립니다.</p>
        <form method="post" onSubmit={this.handleSubmit}>
          위치: <input type="text" name="location"/> <br />
          용량: <input type="text" name="size"/> <br />
          형태: <select name="selected">{type_table}</select><br />
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
      type:["지상형","옥상형","지상형"],
      value:{test:"test"}
    };
    this.handleSubmit=this.handleSubmit.bind(this)
  }

  handleSubmit(e){
    e.preventDefault();
    console.log(e.target[0].value,e.target[1].value,e.target[2].value)
    fetch("/economic/result",{
      method: 'POST',
      headers : {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title:e.target[0].value,
        size:e.target[1].value,
        type:e.target[2].value
      })
      }).then(response=>{
      if (response.ok){
          return response.json();
        }
        throw new Error('Request failed!');
      }, networkError=> console.log(networkError.message)
    ).then(
      jsonResponse=>{
      console.log(jsonResponse)
    });
    this.props.history.push(`/result`);
  }
  render(){
    let type_table= this.state.type.map((d,i)=>
      <option key={`${i}`}value={d}>{d}</option>
    );
    return(
      <form method="post" onSubmit={this.handleSubmit}>
        위치: <input type="text" name="location"/> <br />
        용량: <input type="text" name="size"/> <br />
        형태: <select name="selected">{type_table}</select><br />
        <input type="submit" value="Submit" />
      </form>
    )
  }
}
