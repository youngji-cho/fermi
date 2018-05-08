import React from 'react';
import {Layout,Header,Drawer,Board,TimeButton} from './layout';
import {withRouter} from "react-router-dom";
import {datechange,datechangeDate,datechangeYear,datechangeQuarter,datechangeMonth} from "../../util";
import Calendar from 'react-calendar';

export class SimulationInput extends React.Component{
  constructor(props){
    super(props);
    let today= new Date();
    this.state={
      success:false,
      loading:false,
      second:false,
      third:false,
      type:"month",
      //첫번째
      year:15,
      size:99,
      weight:1.2,
      average_time:3.4,
      startdate:new Date(today.setMonth(today.getMonth()+2)),
      plantlist:[{in:"solar",out:"태양광"}],
      plant:"solar",
      //두번째
      construction:0,
      investment:0,
      debt:0,
      interest:5,
      unredeemed:3,
      duration:12,
      repayment_list:[{in:"IOL",out:"만기일시상환"},{in:"CAM",out:"원금균등분할"},{in:"CPM",out:"원리금균등분할상환"}],
      repayment_method:"원리금균등상환",
      //
      scenelist:[{in:"lm_model",out:"보통"}],
      scene:"lm_model"
    };
    this.handleFirstClick=this.handleFirstClick.bind(this);
    this.handleSecondClick=this.handleSecondClick.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    //첫번째
    this.handleDateChange=this.handleDateChange.bind(this);
    this.handleYearChange=this.handleYearChange.bind(this);
    this.handleSizeChange=this.handleSizeChange.bind(this);
    this.handleWeightChange=this.handleWeightChange.bind(this);
    this.handleAverageTimeChange=this.handleAverageTimeChange.bind(this);
    this.handlePlantChange=this.handlePlantChange.bind(this);
    //두번째
    this.handleConstructionChange=this.handleConstructionChange.bind(this);
    this.handleInvestmentChange=this.handleInvestmentChange.bind(this);
    this.handleDebtChange=this.handleDebtChange.bind(this);
    this.handleInterestChange=this.handleInterestChange.bind(this);
    this.handleUnredeemedChange=this.handleUnredeemedChange.bind(this);
    this.handleDurationChange=this.handleDurationChange.bind(this);
    this.handleRepaymentMethodChange=this.handleRepaymentMethodChange.bind(this);
    //세번째
    this.handleSceneChange=this.handleSceneChange.bind(this);
  }
  handleFirstClick(){
    this.setState({second:true})
  }
  handleSecondClick(){
    this.setState({third:true})
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
          type:this.state.type,
          //첫번째 입력창
          year:this.state.year,
          size:this.state.size,
          weight: this.state.weight,
          averagetime: this.state.average_time,
          startdate:this.state.startdate,
          //두번째 입력창
          construction:this.state.construction,
          investment:this.state.investment,
          debt:this.state.debt,
          interest:this.state.interest,
          unredeemed:this.state.unredeemed,
          duration:this.state.duration,
          repayment_method:this.state.repayment_method,
          //세번째 입력창
          scene:this.state.scene
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
  handleDateChange(e){
    this.setState({startdate:e})
  }
  handlePlantChange(e){
    this.setState({plant:e.target.value})
  }
  //두번째
  handleConstructionChange(e){
    this.setState({construction:e.target.value})
  }
  handleInvestmentChange(e){
    this.setState({investment:e.target.value});
  }
  handleDebtChange(e){
    this.setState({debt:e.target.value});
  }
  handleInterestChange(e){
    this.setState({interest:e.target.value});
  }
  handleUnredeemedChange(e){
    this.setState({unredeemed:e.target.value});
  }
  handleDurationChange(e){
    this.setState({duration:e.target.value});
  }
  handleRepaymentMethodChange(e){
    this.setState({repayment_method:e.target.value});
  }
  //세번째
  handleSceneChange(e){
    this.setState({scene:e.target.value})
  }
  render(){
    console.log(this.state)
    let first_content=<div></div>;
    let second_content=<div></div>;
    let third_content=<div></div>;
    let scene_table= this.state.scenelist.map((d,i)=>
      <option key={`${i}`} value={d.in}>{d.out}</option>
    );
    let plant_table= this.state.plantlist.map((d,i)=>
      <option key={`${i}`} value={d.in}>{d.out}</option>
    );
    let repayment_table=this.state.repayment_list.map((d,i)=>
      <option key={`${i}`} value={d.in}>{d.out}</option>
    );
    if (this.state.loading) {
      first_content=(<h1>Loading...</h1>);
      second_content=(<h1>Loading...</h1>);
      third_content=(<h1>Loading...</h1>);
    } else {
      first_content=(
        <div>
        <div className="simul_form" >재무예측기간: <input  type="number" onChange={this.handleYearChange} value={this.state.year} /></div>
        <div className="simul_form">발전소 크기(kw): <input type="number" onChange={this.handleSizeChange} value={this.state.size} /> </div>
        <div className="simul_form"> REC 가중: <input type="number" className="simul_form" onChange={this.handleWeightChange} value={this.state.weight} /></div>
        <div className="simul_form">평균발전시간: <input type="number" onChange={this.handleAverageTimeChange} value={this.state.average_time} /></div>
        <div className="simul_form"> 발전방식: <select name="selected" onChange={this.handlePlantChange}>{plant_table}</select></div>
        <div>발전소 운영시작 시기: {datechangeDate(this.state.startdate)}<Calendar onChange={this.handleDateChange} value={this.state.startdate} /></div>
        <br />
        <button onClick={this.handleFirstClick} className="mdl-button mdl-js-button mdl-button--raised">다음</button>     </div>
      )
      second_content=(<div>
        <div className="simul_form">총건설비: <input type="number" onChange={this.handleConstructionChange} value={this.state.construction} /> </div>
        <div className="simul_form">총투자비: <input type="number" onChange={this.handleInvestmentChange} value={this.state.investement} /> </div>
        <div className="simul_form">대출금: <input type="number" onChange={this.handleDebtChange} value={this.state.debt} /> </div>
        <div className="simul_form">대출금리(%): <input type="number" onChange={this.handleInterestChange} value={this.state.interest} /> </div>
        <div className="simul_form">거치기간(개월): <input type="number" onChange={this.handleUnredeemedChange} value={this.state.unredeemed} /> </div>
        <div className="simul_form">만기: <input type="number" onChange={this.handleDurationChange} value={this.state.duration} /> </div>
        <div className="simul_form">상환방법: <select name="selected" onChange={this.handleRepaymentMethodChange}>{repayment_table}</select></div>
        <br />
        <br />
        <button onClick={this.handleSecondClick} className="mdl-button mdl-js-button mdl-button--raised">다음</button></div>)
      third_content=(
      <div>
        <div className="simul_form"> 시나리오: <select name="selected" onChange={this.handleSceneChange}>{scene_table}</select></div>
        <br />
        <br />
        <button onClick={this.handleSubmit} className="mdl-button mdl-js-button mdl-button--raised">분석시작</button>
      </div>
    )
    }
    return(
    <div className="overflow">
    <Board name="기초정보 입력">
      <p> 발전소 시뮬레이션입니다. 다음값을 입력하시면 자동으로 시뮬레이션을 해드립니다.</p>
      {first_content}
    </Board>
    {(this.state.second==true)?<Board name="금융조건 ">{second_content}</Board>:<div></div>}
    {(this.state.third==true)?<Board name="시나리오 입력 ">{third_content}</Board>:<div></div>}
    </div>
    )
  }
}
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


export class SimulationOutputTest extends React.Component{
  constructor(props){
    super(props);
    this.state={
      data:[],
      loading:true,
      type:'month'
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
    }
    return(
      <Board name="시뮬레이션 결과">
        {table}
      </Board>
    )
  }
}
