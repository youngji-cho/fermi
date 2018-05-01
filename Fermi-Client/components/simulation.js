import React from 'react';
import {Layout,Header,Drawer,Board} from '../components/layout';
import {withRouter} from "react-router-dom";

export class SimulationInput extends React.Component{
  constructor(props){
    super(props);
    this.state={
      type:[{in:"month",out:"월간"}],
      scene:[{in:"lm_model",out:"보통"}],
      success:false,
      loading:false
    };
    this.handleSubmit=this.handleSubmit.bind(this)
  }
  handleSubmit(e){
    this.setState({loading:true});
    e.preventDefault();
    console.log(e.target[5].value,e.target[6].value)
    let id =new Date().getTime().toString();
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
  render(){
    let content=<div></div>
    let type_table= this.state.type.map((d,i)=>
      <option key={`${i}`} value={d.in}>{d.out}</option>
    );
    let scene_table= this.state.scene.map((d,i)=>
      <option key={`${i}`} value={d.in}>{d.out}</option>
    );
    if (this.state.loading) {
      content=(<h1>Loading...</h1>);
    } else {
      let sample={
        startdate:`${(new Date()).getFullYear()}-${(new Date()).getMonth()+1}-${(new Date()).getDate()}`,
        year:15,
        size:99,
        weight:1.2,
        average_time:3.4
      }
      content=(
      <form method="post" onSubmit={this.handleSubmit}>
        발전소 운영시작 시기: <input type="textarea" value={sample.startdate} /> <br />
        재무예측기간: <input type="text" value={sample.year} /> <br />
        발전소 크기(kw): <input type="text" value={sample.size} /> <br />
        REC 가중: <input type="text" value={sample.weight} /> <br />
        평균발전시간: <input type="text" value={sample.average_time} /> <br />
        시나리오: <select name="selected">{scene_table}</select><br />
        재무분석결과방식: <select name="selected" value="">{type_table}</select><br /><br />
        <input type="submit" value="분석시작" /><input type="reset" value="다시입력" />
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
        console.log("after",this.state.data.Item.response)
      })
  }
  render(){
    console.log("before",this.state)
    let table=""
    if (this.state.loading) {
      table=(<h1>Loading...</h1>);
    } else {
      let data = this.state.data.Item.response;
      table= data.map((d,i)=>
      <tr key={`simul${i}`}>
        <td key={`rec_price(${i})`}>{d.rec_price}</td>
        <td key={`smp_price(${i})`}>{d.smp_price}</td>
        <td key={`rec_revenue(${i})`}>{d.rec_revenue}</td>
        <td key={`smp_revenue(${i})`}>{d.smp_revenue}</td>
      </tr>)
    }
    return(
      <Board name="경제성 분석 시뮬레이션">
        <p>{this.props.match.params.id}</p>
        <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp" >
        <thead>
          <tr>
            <th>REC가격</th><th>SMP가격</th><th>REC수입</th><th>SMP수익</th>
          </tr>
        </thead>
        <tbody>
          {table}
        </tbody>
        </table>
      </Board>
    )
  }
}
