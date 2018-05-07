import React from 'react';
import {Layout,Header,Drawer,Board,TimeButton} from '../components/layout';
import {withRouter} from "react-router-dom";
import {datechange,datechangeYear,datechangeQuarter,datechangeMonth} from "../../util";
import Calendar from 'react-calendar';

export class SimulationOutput extends React.Component{
  constructor(props){
    super(props);
    this.state={
      data:[],
      loading:true,
      price_forecast:true,
      yearly_forecast:false,
      quarterly_forecast:false,
      monthly_forecast:false
    };
    this.handlePriceForecastChange=this.handlePriceForecastChange.bind(this);
    this.handleYearlyForecastChange=this.handleYearlyForecastChange.bind(this);
    this.handleQuarterlyForecastChange=this.handleQuarterlyForecastChange.bind(this);
    this.handleMonthlyForecastChange=this.handleMonthlyForecastChange.bind(this);
  }
  componentDidMount(){
    fetch(`/economic/result/1525692483546`).then(
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
        console.log(this.state)
      })
  }
  handlePriceForecastChange(){
    const change = this.state.price_forecast == true ? false : true;
    this.setState({ price_forecast: change });
  }
  handleYearlyForecastChange(){
    const change = this.state.yearly_forecast == true ? false : true;
    this.setState({ yearly_forecast: change });
  }
  handleQuarterlyForecastChange(){
    const change = this.state.quaterly_forecast == true ? false : true;
    this.setState({quarterly_forecast: change });
  }
  handleMonthlyForecastChange(){
    const change = this.state.monthly_forecast == true ? false : true;
    this.setState({monthly_forecast: change });
  }
  render(){
    let table="";let column=""; let smp_price="";let rec_price="";let smp_revenue="";let rec_revenue="";let days="";let total_cost="";

    let yearly_table="";let yearly_column="";
    let yearly_smp_revenue="";let yearly_rec_revenue="";

    let quarterly_table="";let quarterly_column="";
    let quarterly_smp_revenue="";let quarterly_rec_revenue="";

    let monthly_table=""; let monthly_column="";
    let monthly_smp_revenue="";let monthly_rec_revenue="";

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
      let yearly_forecast=this.state.data.Item.response.result_year
      yearly_forecast.map((d,i)=>{
        yearly_forecast[i].time=datechangeYear(d.date.start_time)
       }
      )
      yearly_column=yearly_forecast.map((d,i)=>
        <th key={`yearly_date(${i})`}>{d.time}</th>
      )
      yearly_smp_revenue= yearly_forecast.map((d,i)=>
        <td key={`yearly_smp_revenue(${i})`}>{d.smp_revenue}</td>
      )
      yearly_rec_revenue= yearly_forecast.map((d,i)=>
        <td key={`yearly_rec_revenue(${i})`}>{d.rec_revenue}</td>
      )
      yearly_table=(
        <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp" >
        <thead>
          <tr>
            <th>기간</th>
            {yearly_column}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>예상 SMP 수입</td>
            {yearly_smp_revenue}
          </tr>
          <tr>
            <td>예상 REC 수입</td>
            {yearly_rec_revenue}
          </tr>
        </tbody>
        </table>
      )
      let quarterly_forecast=this.state.data.Item.response.result_quarter
      quarterly_forecast.map((d,i)=>{
        quarterly_forecast[i].time=datechangeQuarter(d.date.start_time)
       }
      )
      quarterly_column=quarterly_forecast.map((d,i)=>
        <th key={`quarterly_date(${i})`}>{d.time}</th>
      )
      quarterly_smp_revenue= quarterly_forecast.map((d,i)=>
        <td key={`quarterly_smp_revenue(${i})`}>{d.smp_revenue}</td>
      )
      quarterly_rec_revenue= quarterly_forecast.map((d,i)=>
        <td key={`quarterly_rec_revenue(${i})`}>{d.rec_revenue}</td>
      )
      quarterly_table=(
        <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp" >
        <thead>
          <tr>
            <th>기간</th>
            {quarterly_column}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>예상 SMP 수입</td>
            {quarterly_smp_revenue}
          </tr>
          <tr>
            <td>예상 REC 수입</td>
            {quarterly_rec_revenue}
          </tr>
        </tbody>
        </table>
      )
      let monthly_forecast=this.state.data.Item.response.result_month
      monthly_forecast.map((d,i)=>{
        monthly_forecast[i].time=datechangeMonth(d.date.start_time)
       }
      )
      monthly_column=monthly_forecast.map((d,i)=>
        <th key={`monthly_date(${i})`}>{d.time}</th>
      )
      monthly_smp_revenue= monthly_forecast.map((d,i)=>
        <td key={`monthly_smp_revenue(${i})`}>{d.smp_revenue}</td>
      )
      monthly_rec_revenue= monthly_forecast.map((d,i)=>
        <td key={`monthly_rec_revenue(${i})`}>{d.rec_revenue}</td>
      )
      monthly_table=(
        <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp" >
        <thead>
          <tr>
            <th>기간</th>
            {monthly_column}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>예상 SMP 수입</td>
            {monthly_smp_revenue}
          </tr>
          <tr>
            <td>예상 REC 수입</td>
            {monthly_rec_revenue}
          </tr>
        </tbody>
        </table>
      )
    }
    return(
    <div className="overflow">
      <Board name="시뮬레이션 결과">
        <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">
          <input type="checkbox" className="mdl-checkbox__input" checked={this.state.price_forecast} onChange={this.handlePriceForecastChange}/>
          <span className="mdl-checkbox__label">가격예측</span>
        </label>
        <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">
          <input type="checkbox" className="mdl-checkbox__input" checked={ this.state.yearly_forecast} onChange={this.handleYearlyForecastChange} />
          <span className="mdl-checkbox__label">연별예측결과</span>
        </label>
        <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">
          <input type="checkbox" className="mdl-checkbox__input" checked={this.state.quarterly_forecast} onChange={this.handleQuarterlyForecastChange}/>
          <span className="mdl-checkbox__label">분기별예측결과</span>
        </label>
        <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">
          <input type="checkbox" className="mdl-checkbox__input" checked={this.state.monthly_forecast}
          onChange={this.handleMonthlyForecastChange}/>
          <span className="mdl-checkbox__label">월별예측결과</span>
        </label>
        {(this.state.price_forecast)?<Board name="가격예측">{table}</Board>:<div></div>}
      </Board>
      {(this.state.yearly_forecast)?<Board name="연간재무예측">{yearly_table}</Board>:<div></div>}
      {(this.state.quarterly_forecast)?<Board name="분기별 재무예측">{quarterly_table}</Board>:<div></div>}
      {(this.state.monthly_forecast)?<Board name="월별재무예측">{monthly_table}</Board>:<div></div>}
    </div>
    )
  }
}
