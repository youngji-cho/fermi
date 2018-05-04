import React from 'react';
import {Layout,Header,Drawer,Board} from '../components/layout';
import {withRouter} from "react-router-dom";
import {datechange,datechangeMonth} from "../../util";
import Calendar from 'react-calendar';

1525415705334

export class SimulationOutput extends React.Component{
  constructor(props){
    super(props);
    this.state={
      data:[],
      loading:true,
      price_forecast:true,
      yearly_forecast:true,
      quarterly_forecast:true,
      monthly_forecast:true
    };
  }
  componentDidMount(){
    fetch(`/economic/result/1525415705334`).then(
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
    console.log("JSON is",this.state.data)
    let table="";let column=""; let smp_price="";let rec_price="";let smp_revenue="";let rec_revenue="";let days="";let total_cost="";

    if(this.state.loading) {
      table=(<h1>Loading...</h1>)
    } else {
      let price_forecast= this.state.data.Item.response.price_forecast;
      price_forecast.map((d,i)=>{
        price_forecast[i].time=datechangeMonth(d.date.start_time)
       }
      )
      column=price_forecast.map((d,i)=>
        <th key={`date(${i})`}>{d.time}</th>
      )
      smp_price= price_forecast.map((d,i)=>
        <td key={`smp_price(${i})`}>{d.smp_price}</td>
      )
      rec_price= price_forecast.map((d,i)=>
        <td key={`rec_price(${i})`}>{d.smp_price}</td>
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
        </tbody>
        </table>
      )
      yearly_table=(
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
        </tbody>
        </table>
      )
      quarterly_table=(
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
        </tbody>
        </table>
      )
      yearly_table=(
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
        </tbody>
        </table>
      )
    }
    return(
    <div className="overflow">
      <Board name="시뮬레이션 결과">
        <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">
          <input type="checkbox" className="mdl-checkbox__input" checked />
          <span className="mdl-checkbox__label">가격예측</span>
        </label>
        <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">
          <input type="checkbox" className="mdl-checkbox__input" checked />
          <span className="mdl-checkbox__label">연별예측결과</span>
        </label>
        <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">
          <input type="checkbox" className="mdl-checkbox__input" checked />
          <span classNmae="mdl-checkbox__label">분기별예측결과</span>
        </label>
        <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">
          <input type="checkbox" className="mdl-checkbox__input" checked />
          <span classNmae="mdl-checkbox__label">월별예측결과</span>
        </label>
        {table}
      </Board>
      {(this.state.yearly_forecast)?<Board name="연간재무예측"></Board>:<div></div>}
      {(this.state.quarterly_forecast)?<Board name="분기별 재무예측"></Board>:<div></div>}
      {(this.state.monthly_forecast)?<Board name="월별재무예측"></Board>:<div></div>}
    </div>
    )
  }
}
