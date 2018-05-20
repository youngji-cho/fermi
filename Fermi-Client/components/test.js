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
      yearly_cash:false,
      quarterly_cash:false,
      monthly_cash:false
    };
    this.handlePriceForecastChange=this.handlePriceForecastChange.bind(this);
    this.handleYearlyCashChange=this.handleYearlyCashChange.bind(this);
    this.handleQuarterlyCashChange=this.handleQuarterlyCashChange.bind(this);
    this.handleMonthlyCashChange=this.handleMonthlyCashChange.bind(this);
  }
  componentDidMount(){
    fetch(`/economic/result/1526797932377`).then(
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
  handleYearlyCashChange(){
    const change = this.state.yearly_cash == true ? false : true;
    this.setState({ yearly_cash: change });
  }
  handleQuarterlyCashChange(){
    const change = this.state.quarterly_cash == true ? false : true;
    this.setState({quarterly_cash: change });
  }
  handleMonthlyCashChange(){
    const change = this.state.monthly_cash == true ? false : true;
    this.setState({monthly_cash: change });
  }
  render(){
    console.log(this.state)
    let price_table="";let column=""; let smp_price="";let rec_price="";let smp_revenue="";let rec_revenue="";let days="";let total_cost="";

    let yearly_cash_table="";let yearly_column="";let yearly_smp_revenue="";let yearly_rec_revenue="";let yearly_total_cost="";let yearly_start_cash="";let yearly_end_cash="";

    let quarterly_cash_table="";let quarterly_column="";let quarterly_smp_revenue="";let quarterly_rec_revenue="";let quarterly_total_cost="";let quarterly_start_cash="";let quarterly_end_cash="";

    let monthly_cash_table=""; let monthly_column="";let monthly_smp_revenue="";let monthly_rec_revenue="";let monthly_total_cost="";let monthly_start_cash="";let monthly_end_cash="";

    if(this.state.loading) {
      price_table=(<h1>Loading...</h1>)
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
      price_table=(
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
      let cashflow_year=this.state.data.Item.response.cashflow_year
      cashflow_year_column=cashflow_year.map((d,i)=>
        <th key={`yearly_date(${i})`}>{d.date}</th>
      )
      cashflow_year_operation_cash=cashflow_year.map((d,i)=>
        <th key={`operation_cash(${i})`}>{d.operation_cash}</th>
      )
      cashflow_year_smp_revenue= cashflow_year.map((d,i)=>
        <td key={`cashflow_year_smp_revenue(${i})`}>{d.smp_revenue}</td>
      )
      cashflow_year_rec_revenue= cashflow_year.map((d,i)=>
        <td key={`cashflow_year_rec_revenue(${i})`}>{d.rec_revenue}</td>
      )
      cashflow_year_operation_cash_in= cashflow_year.map((d,i)=>
        <td key={`cashflow_year_operation_cash_in(${i})`}>{d.operation_cash_in}</td>
      )
      cashflow_year_OM_cost= cashflow_year.map((d,i)=>
        <td key={`cashflow_year_OM_cost(${i})`}>{d.OM_cost}</td>
      )
      cashflow_year_monitoring_cost= cashflow_year.map((d,i)=>
        <td key={`cashflow_year_monitoring_cost(${i})`}>{d.monitoring_cost}</td>
      )
      cashflow_year_elec_safety_cost= cashflow_year.map((d,i)=>
        <td key={`cashflow_year_elec_safety_cost(${i})`}>{d.elec_safety_cost}</td>
      )
      cashflow_year_office_cost= cashflow_year.map((d,i)=>
        <td key={`cashflow_year_office_cost(${i})`}>{d.office_cost}</td>
      )
      cashflow_year_other_cost= cashflow_year.map((d,i)=>
        <td key={`cashflow_year_other_cost(${i})`}>{d.other_cost}</td>
      )
      cashflow_year_interest= cashflow_year.map((d,i)=>
        <td key={`cashflow_year_interest(${i})`}>{d.interest}</td>
      )
      cashflow_year_tax= cashflow_year.map((d,i)=>
        <td key={`cashflow_year_tax(${i})`}>{d.tax}</td>
      )


      yearly_total_cost=yearly_cash.map((d,i)=>
        <td key={`yearly_total_cost(${i})`}>{d.total_cost}</td>
      )
      yearly_start_cash=yearly_cash.map((d,i)=>
        <td key={`yearly_start_cash(${i})`}>{d.start_cash}</td>
      )
      yearly_end_cash=yearly_cash.map((d,i)=>
        <td key={`yearly_end_cash(${i})`}>{d.end_cash}</td>
      )
      yearly_cash_table=(
        <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp" >
        <thead>
          <tr>
            <th>기간</th>
            {yearly_column}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>기초현금</td>
            {yearly_start_cash}
          </tr>
          <tr>
            <td>예상 SMP 수입</td>
            {yearly_smp_revenue}
          </tr>
          <tr>
            <td>예상 REC 수입</td>
            {yearly_rec_revenue}
          </tr>
          <tr>
            <td>운영비</td>
            {yearly_total_cost}
          </tr>
          <tr>
            <td>기말현금</td>
            {yearly_end_cash}
          </tr>
        </tbody>
        </table>
      )
      let quarterly_cash=this.state.data.Item.response.result_quarter_cash
      quarterly_cash.map((d,i)=>{
        quarterly_cash[i].time=datechangeQuarter(d.date.start_time)
       }
      )
      quarterly_column=quarterly_cash.map((d,i)=>
        <th key={`quarterly_date(${i})`}>{d.time}</th>
      )
      quarterly_smp_revenue= quarterly_cash.map((d,i)=>
        <td key={`quarterly_smp_revenue(${i})`}>{d.smp_revenue}</td>
      )
      quarterly_rec_revenue= quarterly_cash.map((d,i)=>
        <td key={`quarterly_rec_revenue(${i})`}>{d.rec_revenue}</td>
      )
      quarterly_total_cost=quarterly_cash.map((d,i)=>
        <td key={`quarterly_total_cost(${i})`}>{d.total_cost}</td>
      )
      quarterly_start_cash=quarterly_cash.map((d,i)=>
        <td key={`quarterly_start_cash(${i})`}>{d.start_cash}</td>
      )
      quarterly_end_cash=quarterly_cash.map((d,i)=>
        <td key={`quarterly_end_cash(${i})`}>{d.end_cash}</td>
      )
      quarterly_cash_table=(
        <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp" >
        <thead>
          <tr>
            <th>기간</th>
            {quarterly_column}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>기초현금</td>
            {quarterly_start_cash}
          </tr>
          <tr>
            <td>예상 SMP 수입</td>
            {quarterly_smp_revenue}
          </tr>
          <tr>
            <td>예상 REC 수입</td>
            {quarterly_rec_revenue}
          </tr>
          <tr>
            <td>운영비</td>
            {quarterly_total_cost}
          </tr>
          <tr>
            <td>기말현금</td>
            {quarterly_end_cash}
          </tr>
        </tbody>
        </table>
      )
      let monthly_cash=this.state.data.Item.response.result_month_cash
      monthly_cash.map((d,i)=>{
        monthly_cash[i].time=datechangeMonth(d.date.start_time)
       }
      )
      monthly_column=monthly_cash.map((d,i)=>
        <th key={`monthly_date(${i})`}>{d.time}</th>
      )
      monthly_smp_revenue= monthly_cash.map((d,i)=>
        <td key={`monthly_smp_revenue(${i})`}>{d.smp_revenue}</td>
      )
      monthly_rec_revenue= monthly_cash.map((d,i)=>
        <td key={`monthly_rec_revenue(${i})`}>{d.rec_revenue}</td>
      )
      monthly_total_cost=monthly_cash.map((d,i)=>
        <td key={`monthly_total_cost(${i})`}>{d.total_cost}</td>
      )
      monthly_start_cash=monthly_cash.map((d,i)=>
        <td key={`monthly_start_cash(${i})`}>{d.start_cash}</td>
      )
      monthly_end_cash=monthly_cash.map((d,i)=>
        <td key={`monthly_end_cash(${i})`}>{d.end_cash}</td>
      )
      monthly_cash_table=(
        <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp" >
        <thead>
          <tr>
            <th>기간</th>
            {monthly_column}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>기초현금</td>
            {monthly_start_cash}
          </tr>
          <tr>
            <td>예상 SMP 수입</td>
            {monthly_smp_revenue}
          </tr>
          <tr>
            <td>예상 REC 수입</td>
            {monthly_rec_revenue}
          </tr>
          <tr>
            <td>운영비</td>
            {monthly_total_cost}
          </tr>
          <tr>
            <td>기말현금</td>
            {monthly_end_cash}
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
          <input type="checkbox" className="mdl-checkbox__input" checked={this.state.yearly_cash} onChange={this.handleYearlyCashChange} />
          <span className="mdl-checkbox__label">연간예상현금흐름표</span>
        </label>
        <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">
          <input type="checkbox" className="mdl-checkbox__input" checked={this.state.quarterly_cash} onChange={this.handleQuarterlyCashChange}/>
          <span className="mdl-checkbox__label">분기별예상현금흐름표</span>
        </label>
        <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">
          <input type="checkbox" className="mdl-checkbox__input" checked={this.state.monthly_cash}
          onChange={this.handleMonthlyCashChange}/>
          <span className="mdl-checkbox__label">월별예상현금흐름표</span>
        </label>
        {(this.state.price_forecast)?<div>{price_table}</div>:<div></div>}
      </Board>
      {(this.state.yearly_cash)?<Board name="연간현금흐름표">{yearly_cash_table}</Board>:<div></div>}
      {(this.state.quarterly_cash)?<Board name="분기별현금흐름표">{quarterly_cash_table}</Board>:<div></div>}
      {(this.state.monthly_cash)?<Board name="월별현금흐름표">{monthly_cash_table}</Board>:<div></div>}
    </div>
    )
  }
}
