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
      //첫번째
      year:15,
      size:99,
      weight:1.2,
      average_time:3.4,
      startdate:datechange(new Date(today.setMonth(today.getMonth()+2))),
      plantlist:[{in:"solar",out:"태양광"}],
      plant:"solar",
      //두번째
      construction:150000000,
      othercost:20000000,
      investment:180000000,
      equity:60000000,
      debt:120000000,
      interest:5,
      unredeemed:3,
      duration:12,
      repayment_list:[{in:"cam",out:"원금균등분할"},{in:"cpm",out:"원리금균등분할상환"}],
      repayment_method:"cpm",
      repayment_term_list:[{in:"m",out:"월간"}],
      repayment_term:"m",
      interest_repayment_term_list:[{in:"m",out:"월간"}],
      interest_repayment_term:"m",
      finance_startdate:datechange(new Date(today.setMonth(today.getMonth()+1))),
      //
      scenelist:[{in:"lm_model",out:"회귀분석"}],
      scene:"lm_model",
      price_index:0.01,
      solar_index:0.008
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
    this.handleOthercostChange=this.handleOthercostChange.bind(this);
    this.handleInvestmentChange=this.handleInvestmentChange.bind(this);
    this.handleEquityChange=this.handleEquityChange.bind(this)
    this.handleDebtChange=this.handleDebtChange.bind(this);
    this.handleInterestChange=this.handleInterestChange.bind(this);
    this.handleUnredeemedChange=this.handleUnredeemedChange.bind(this);
    this.handleDurationChange=this.handleDurationChange.bind(this);
    this.handleRepaymentMethodChange=this.handleRepaymentMethodChange.bind(this);
    this.handleRepaymentTermChange=this.handleRepaymentTermChange.bind(this);
    this.handleInterestRepaymentTermChange=this.handleInterestRepaymentTermChange.bind(this);
    this.handleFinanceDateChange=this.handleFinanceDateChange.bind(this);
    //세번째
    this.handleSceneChange=this.handleSceneChange.bind(this);
    this.handlePriceIndexChange=this.handlePriceIndexChange.bind(this);
    this.handleSolarIndexChange=this.handleSolarIndexChange.bind(this);
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
          //첫번째 입력창
            year:this.state.year,
            size:this.state.size,
            weight: this.state.weight,
            average_time: this.state.average_time,
            startdate:this.state.startdate,
            plant:this.state.plant,
          //두번째 입력창
            construction:this.state.construction,
            othercost:this.state.othercost,
            investment:this.state.investment,
            equity:this.state.equity,
            debt:this.state.debt,
            interest:this.state.interest,
            unredeemed:this.state.unredeemed,
            duration:this.state.duration,
            repayment_method:this.state.repayment_method,
            repayment_term:this.state.repayment_term,
            interest_repayment_term:this.state.interest_repayment_term,
            finance_startdate:this.state.finance_startdate,
          //세번째 입력창
            scene:this.state.scene,
            price_index:this.state.price_index,
            solar_index:this.state.solar_index
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
    this.setState({startdate:datechange(e)})
  }
  handlePlantChange(e){
    this.setState({plant:e.target.value})
  }
  //두번째
  handleConstructionChange(e){
    this.setState({construction:e.target.value})
  }
  handleOthercostChange(e){
    this.setState({othercost:e.target.value})
  }
  handleInvestmentChange(e){
    this.setState({investment:e.target.value});
  }
  handleEquityChange(e){
    this.setState({equity:e.target.value});
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
  handleRepaymentTermChange(e){
    this.setState({repayment_term:e.target.value});
  }
  handleInterestRepaymentTermChange(e){
    this.setState({interest_repayment_term:e.target.value});
  }
  handleFinanceDateChange(e){
    this.setState({finance_startdate:datechange(e)})
  }
  //세번째
  handleSceneChange(e){
    this.setState({scene:e.target.value})
  }
  handlePriceIndexChange(e){
    this.setState({price_index:e.target.value/100})
  }
  handleSolarIndexChange(e){
    this.setState({solar_index:e.target.value/-100})
  }
  render(){
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
    let repayment_term_table=this.state.repayment_term_list.map((d,i)=>
      <option key={`${i}`} value={d.in}>{d.out}</option>
    );
    let interest_repayment_term_table=this.state.interest_repayment_term_list.map((d,i)=>
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
        <div>발전소 운영시작 시기: {datechangeDate(this.state.startdate)}<Calendar onChange={this.handleDateChange} value={new Date(this.state.startdate)} /></div>
        <br />
        <button onClick={this.handleFirstClick} className="mdl-button mdl-js-button mdl-button--raised">다음</button> </div>
      )
      second_content=(<div>
        <div className="simul_form">총건설비: <input type="number" onChange={this.handleConstructionChange} value={this.state.construction} /> </div>
        <div className="simul_form">기타비용(건설비를 제외한 모든비용, 총투자비-(총건설비+기타비용)=운영초기여유현금): <input type="number" onChange={this.handleOthercostChange} value={this.state.othercost} /> </div>
        <div className="simul_form">총투자비: <input type="number" onChange={this.handleInvestmentChange} value={this.state.investment} /> </div>
        <div className="simul_form">자기자본: <input type="number" onChange={this.handleEquityChange} value={this.state.equity} /> </div>
        <div className="simul_form">대출금: <input type="number" onChange={this.handleDebtChange} value={this.state.debt} /> </div>
        <div className="simul_form">대출금리(%): <input type="number" onChange={this.handleInterestChange} value={this.state.interest} /> </div>
        /*<div className="simul_form">거치기간(개월): <input type="number" onChange={this.handleUnredeemedChange} value={this.state.unredeemed} /> </div>거치기간은 별도 계산*/
        <div className="simul_form">만기: <input type="number" onChange={this.handleDurationChange} value={this.state.duration} /> </div>
        <div className="simul_form">상환방법: <select name="selected" onChange={this.handleRepaymentMethodChange}>{repayment_table}</select></div>
        <div className="simul_form">원금상환주기 <select name="selected" onChange={this.handleRepaymentTermChange}>{repayment_term_table}</select></div>
        <div className="simul_form">이자상환주기 <select name="selected" onChange={this.handleInterestRepaymentTermChange}>{interest_repayment_term_table}</select></div>
        <div>대출금 조달시기: {datechangeDate(this.state.finance_startdate)}<Calendar onChange={this.handleFinanceDateChange} value={new Date(this.state.finance_startdate)} /></div>
        <br />
        <br />
        <br />
        <button onClick={this.handleSecondClick} className="mdl-button mdl-js-button mdl-button--raised">다음</button></div>)
      third_content=(
      <div>
        <div className="simul_form"> 시나리오: <select name="selected" onChange={this.handleSceneChange}>{scene_table}</select></div>
        <div className="simul_form" >물가상승률: <input  type="number" onChange={this.handlePriceIndexChange} value={this.state.price_index} /></div>
        <div className="simul_form" > 태양광 모듈효율저하율: <input type="number" onChange={this.handleSolarIndexChange} value={this.state.solar_index*-100} /></div>
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
      income_year:false,
      income_quarter:false,
      income_month:false,
      cashflow_year:false,
      cashflow_quarter:false,
      cashflow_month:false
    };
    this.handleIncomeYearChange=this.handleIncomeYearChange.bind(this)
    this.handleIncomeQuarterChange=this.handleIncomeQuarterChange.bind(this)
    this.handleIncomeMonthChange=this.handleIncomeMonthChange.bind(this)
    this.handleCashFlowYearChange=this.handleCashFlowYearChange.bind(this)
    this.handleCashFlowQuarterChange=this.handleCashFlowQuarterChange.bind(this)
    this.handleCashFlowMonthChange=this.handleCashFlowMonthChange.bind(this)
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
  handleIncomeYearChange(){
    const change = this.state.income_year == true ? false : true;
    this.setState({ income_year: change });
  }
  handleIncomeQuarterChange(){
    const change = this.state.income_quarter == true ? false : true;
    this.setState({ income_quarter: change });
  }
  handleIncomeMonthChange(){
    const change = this.state.income_month == true ? false : true;
    this.setState({ income_month: change });
  }
  handleCashFlowYearChange(){
    const change = this.state.cashflow_year == true ? false : true;
    this.setState({cashflow_year: change});
  }
  handleCashFlowQuarterChange(){
    const change = this.state.cashflow_quarter == true ? false : true;
    this.setState({cashflow_quarter: change});
  }
  handleCashFlowMonthChange(){
    const change = this.state.cashflow_month == true ? false : true;
    this.setState({cashflow_month: change});
  }
  render(){
    if(this.state.loading) {
      var result_table= (
      <Board name="시뮬레이션 결과">
        <h1>loading...</h1>
      </Board>)
    } else {
      var income_year=this.state.data.Item.response.income_year
      var income_year_column=income_year.map((d,i)=>
        <th key={`yearly_date(${i})`}>{datechangeYear(d.date)}</th>
      )
      var income_year_smp_revenue=income_year.map((d,i)=>
        <th key={`smp_revenue(${i})`}>{d.smp_revenue}</th>
      )
      var income_year_rec_revenue=income_year.map((d,i)=>
        <th key={`rec_revenue(${i})`}>{d.rec_revenue}</th>
      )
      var income_year_gross_income=income_year.map((d,i)=>
        <th key={`gross_income(${i})`}>{d.gross_income}</th>
      )
      var income_year_OM_cost=income_year.map((d,i)=>
        <th key={`OM_cost(${i})`}>{d.OM_cost}</th>
      )
      var income_year_monitoring_cost=income_year.map((d,i)=>
        <th key={`monitoring_cost(${i})`}>{d.monitoring_cost}</th>
      )
      var income_year_elec_safety_cost=income_year.map((d,i)=>
        <th key={`elec_safety_cost(${i})`}>{d.elec_safety_cost}</th>
      )
      var income_year_office_cost=income_year.map((d,i)=>
        <th key={`office_cost(${i})`}>{d.office_cost}</th>
      )
      var income_year_other_cost=income_year.map((d,i)=>
        <th key={`other_cost(${i})`}>{d.other_cost}</th>
      )
      var income_year_depreciation=income_year.map((d,i)=>
        <th key={`depreciation(${i})`}>{d.depreciation}</th>
      )
      var income_year_operating_expense=income_year.map((d,i)=>
        <th key={`operating_expense(${i})`}>{d.operating_expense}</th>
      )
      var income_year_operating_income=income_year.map((d,i)=>
        <th key={`operating_income(${i})`}>{d.operating_income}</th>
      )
      var income_year_interest=income_year.map((d,i)=>
        <th key={`interest(${i})`}>{d.interest}</th>
      )
      var income_year_pretax_net_income=income_year.map((d,i)=>
        <th key={`pretax_net_income(${i})`}>{d.pretax_net_income}</th>
      )
      var income_year_tax=income_year.map((d,i)=>
        <th key={`tax(${i})`}>{d.tax}</th>
      )
      var income_year_net_income=income_year.map((d,i)=>
        <th key={`net_income(${i})`}>{d.net_income}</th>
      )
      var income_year_table=(
        <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp" >
        <thead>
          <tr>
            <th>기간</th>
             {income_year_column}
            </tr>
        </thead>
        <tbody>
          <tr>
            <td>smp 수입</td>
             {income_year_smp_revenue}
          </tr>
          <tr>
            <td>rec 수입</td>
             {income_year_rec_revenue}
          </tr>
          <tr>
            <td><strong>매출액</strong></td>
             {income_year_gross_income}
          </tr>
          <tr>
            <td>O&M 비용</td>
             {income_year_OM_cost}
          </tr>
          <tr>
            <td>모니터링 비용</td>
             {income_year_monitoring_cost}
          </tr>
          <tr>
            <td>전기안전관리자 선임비용</td>
             {income_year_monitoring_cost}
          </tr>
          <tr>
            <td>사무관리비용</td>
             {income_year_office_cost}
          </tr>
          <tr>
            <td>기타비용</td>
             {income_year_other_cost}
          </tr>
          <tr>
            <td>감가상각비용</td>
             {income_year_depreciation}
          </tr>
          <tr>
            <td><strong>영업비용</strong></td>
             {income_year_operating_expense}
          </tr>
          <tr>
            <td><strong>영업이익</strong></td>
             {income_year_operating_income}
          </tr>
          <tr>
            <td>이자비용</td>
             {income_year_interest}
          </tr>
          <tr>
            <td><strong>법인세 차감 전 순이익</strong></td>
             {income_year_pretax_net_income}
          </tr>
          <tr>
            <td>법인세</td>
             {income_year_tax}
          </tr>
          <tr>
            <td><strong>당기순이익</strong></td>
             {income_year_net_income}
          </tr>
        </tbody>
        </table>
      )

      var income_quarter=this.state.data.Item.response.income_quarter
      var income_quarter_column=income_quarter.map((d,i)=>
        <th key={`quarterly_date(${i})`}>{datechangeQuarter(d.date)}</th>
      )
      var income_quarter_smp_revenue=income_quarter.map((d,i)=>
        <th key={`income_quarter_smp_revenue(${i})`}>{d.smp_revenue}</th>
      )
      var income_quarter_rec_revenue=income_quarter.map((d,i)=>
        <th key={`income_quarter_rec_revenue(${i})`}>{d.rec_revenue}</th>
      )
      var income_quarter_gross_income=income_quarter.map((d,i)=>
        <th key={`income_quarter_gross_income(${i})`}>{d.gross_income}</th>
      )
      var income_quarter_OM_cost=income_quarter.map((d,i)=>
        <th key={`income_quarterOM_cost(${i})`}>{d.OM_cost}</th>
      )
      var income_quarter_monitoring_cost=income_quarter.map((d,i)=>
        <th key={`income_quarter_monitoring_cost(${i})`}>{d.monitoring_cost}</th>
      )
      var income_quarter_elec_safety_cost=income_quarter.map((d,i)=>
        <th key={`income_quarter_elec_safety_cost(${i})`}>{d.elec_safety_cost}</th>
      )
      var income_quarter_office_cost=income_quarter.map((d,i)=>
        <th key={`income_quarter_office_cost(${i})`}>{d.office_cost}</th>
      )
      var income_quarter_other_cost=income_quarter.map((d,i)=>
        <th key={`income_quarter_other_cost(${i})`}>{d.other_cost}</th>
      )
      var income_quarter_depreciation=income_quarter.map((d,i)=>
        <th key={`income_quarter_depreciation(${i})`}>{d.depreciation}</th>
      )
      var income_quarter_operating_expense=income_quarter.map((d,i)=>
        <th key={`income_quarter_operating_expense(${i})`}>{d.operating_expense}</th>
      )
      var income_quarter_operating_income=income_quarter.map((d,i)=>
        <th key={`income_quarter_operating_income(${i})`}>{d.operating_income}</th>
      )
      var income_quarter_interest=income_quarter.map((d,i)=>
        <th key={`income_quarter_interest(${i})`}>{d.interest}</th>
      )
      var income_quarter_pretax_net_income=income_quarter.map((d,i)=>
        <th key={`income_quarter_pretax_net_income(${i})`}>{d.pretax_net_income}</th>
      )
      var income_quarter_tax=income_quarter.map((d,i)=>
        <th key={`income_quarter_tax(${i})`}>{d.tax}</th>
      )
      var income_quarter_net_income=income_quarter.map((d,i)=>
        <th key={`income_quarter_net_income(${i})`}>{d.net_income}</th>
      )
      var income_quarter_table=(
        <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp" >
        <thead>
          <tr>
            <th>기간</th>
             {income_quarter_column}
            </tr>
        </thead>
        <tbody>
          <tr>
            <td>smp 수입</td>
             {income_quarter_smp_revenue}
          </tr>
          <tr>
            <td>rec 수입</td>
             {income_quarter_rec_revenue}
          </tr>
          <tr>
            <td><strong>매출액</strong></td>
             {income_quarter_gross_income}
          </tr>
          <tr>
            <td>O&M 비용</td>
             {income_quarter_OM_cost}
          </tr>
          <tr>
            <td>모니터링 비용</td>
             {income_quarter_monitoring_cost}
          </tr>
          <tr>
            <td>전기안전관리자 선임비용</td>
             {income_quarter_monitoring_cost}
          </tr>
          <tr>
            <td>사무관리비용</td>
             {income_quarter_office_cost}
          </tr>
          <tr>
            <td>기타비용</td>
             {income_quarter_other_cost}
          </tr>
          <tr>
            <td>감가상각비용</td>
             {income_quarter_depreciation}
          </tr>
          <tr>
            <td><strong>영업비용</strong></td>
             {income_quarter_operating_expense}
          </tr>
          <tr>
            <td><strong>영업이익</strong></td>
             {income_quarter_operating_income}
          </tr>
          <tr>
            <td>이자비용</td>
             {income_quarter_interest}
          </tr>
          <tr>
            <td><strong>법인세 차감 전 순이익</strong></td>
             {income_quarter_pretax_net_income}
          </tr>
          <tr>
            <td>법인세</td>
             {income_quarter_tax}
          </tr>
          <tr>
            <td><strong>당기순이익</strong></td>
             {income_quarter_net_income}
          </tr>
        </tbody>
        </table>
      )

      var income_month=this.state.data.Item.response.income_month
      var income_month_column=income_month.map((d,i)=>
        <th key={`monthly_date(${i})`}>{datechangeMonth(d.date)}</th>
      )
      var income_month_smp_revenue=income_month.map((d,i)=>
        <th key={`income_month_smp_revenue(${i})`}>{d.smp_revenue}</th>
      )
      var income_month_rec_revenue=income_month.map((d,i)=>
        <th key={`income_month_rec_revenue(${i})`}>{d.rec_revenue}</th>
      )
      var income_month_gross_income=income_month.map((d,i)=>
        <th key={`income_month_gross_income(${i})`}>{d.gross_income}</th>
      )
      var income_month_OM_cost=income_month.map((d,i)=>
        <th key={`income_month_OM_cost(${i})`}>{d.OM_cost}</th>
      )
      var income_month_monitoring_cost=income_month.map((d,i)=>
        <th key={`income_month_monitoring_cost(${i})`}>{d.monitoring_cost}</th>
      )
      var income_month_elec_safety_cost=income_month.map((d,i)=>
        <th key={`income_month_elec_safety_cost(${i})`}>{d.elec_safety_cost}</th>
      )
      var income_month_office_cost=income_month.map((d,i)=>
        <th key={`income_month_office_cost(${i})`}>{d.office_cost}</th>
      )
      var income_month_other_cost=income_month.map((d,i)=>
        <th key={`income_month_other_cost(${i})`}>{d.other_cost}</th>
      )
      var income_month_depreciation=income_month.map((d,i)=>
        <th key={`income_month_depreciation(${i})`}>{d.depreciation}</th>
      )
      var income_month_operating_expense=income_month.map((d,i)=>
        <th key={`income_month_operating_expense(${i})`}>{d.operating_expense}</th>
      )
      var income_month_operating_income=income_month.map((d,i)=>
        <th key={`income_month_operating_income(${i})`}>{d.operating_income}</th>
      )
      var income_month_interest=income_month.map((d,i)=>
        <th key={`income_month_interest(${i})`}>{d.interest}</th>
      )
      var income_month_pretax_net_income=income_month.map((d,i)=>
        <th key={`income_month_pretax_net_income(${i})`}>{d.pretax_net_income}</th>
      )
      var income_month_tax=income_month.map((d,i)=>
        <th key={`income_month_tax(${i})`}>{d.tax}</th>
      )
      var income_month_net_income=income_month.map((d,i)=>
        <th key={`income_month_net_income(${i})`}>{d.net_income}</th>
      )
      var income_month_table=(
        <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp" >
        <thead>
          <tr>
            <th>기간</th>
             {income_month_column}
            </tr>
        </thead>
        <tbody>
          <tr>
            <td>smp 수입</td>
             {income_month_smp_revenue}
          </tr>
          <tr>
            <td>rec 수입</td>
             {income_month_rec_revenue}
          </tr>
          <tr>
            <td><strong>매출액</strong></td>
             {income_month_gross_income}
          </tr>
          <tr>
            <td>O&M 비용</td>
             {income_month_OM_cost}
          </tr>
          <tr>
            <td>모니터링 비용</td>
             {income_month_monitoring_cost}
          </tr>
          <tr>
            <td>전기안전관리자 선임비용</td>
             {income_month_monitoring_cost}
          </tr>
          <tr>
            <td>사무관리비용</td>
             {income_month_office_cost}
          </tr>
          <tr>
            <td>기타비용</td>
             {income_month_other_cost}
          </tr>
          <tr>
            <td>감가상각비용</td>
             {income_month_depreciation}
          </tr>
          <tr>
            <td><strong>영업비용</strong></td>
             {income_month_operating_expense}
          </tr>
          <tr>
            <td><strong>영업이익</strong></td>
             {income_month_operating_income}
          </tr>
          <tr>
            <td>이자비용</td>
             {income_month_interest}
          </tr>
          <tr>
            <td><strong>법인세 차감 전 순이익</strong></td>
             {income_month_pretax_net_income}
          </tr>
          <tr>
            <td>법인세</td>
             {income_month_tax}
          </tr>
          <tr>
            <td><strong>당기순이익</strong></td>
             {income_month_net_income}
          </tr>
        </tbody>
        </table>
      )

      var cashflow_year=this.state.data.Item.response.cashflow_year
      var cashflow_year_column=cashflow_year.map((d,i)=>
        <th key={`yearly_date(${i})`}>{datechangeYear(d.date)}</th>
      )
      var cashflow_year_operation_cash=cashflow_year.map((d,i)=>
        <th key={`operation_cash(${i})`}>{d.operation_cash}</th>
      )
      var cashflow_year_smp_revenue= cashflow_year.map((d,i)=>
        <td key={`cashflow_year_smp_revenue(${i})`}>{d.smp_revenue}</td>
      )
      var cashflow_year_rec_revenue= cashflow_year.map((d,i)=>
        <td key={`cashflow_year_rec_revenue(${i})`}>{d.rec_revenue}</td>
      )
      var cashflow_year_operation_cash_in= cashflow_year.map((d,i)=>
        <td key={`cashflow_year_operation_cash_in(${i})`}>{d.operation_cash_in}</td>
      )
      var cashflow_year_OM_cost= cashflow_year.map((d,i)=>
        <td key={`cashflow_year_OM_cost(${i})`}>{d.OM_cost}</td>
      )
      var cashflow_year_monitoring_cost= cashflow_year.map((d,i)=>
        <td key={`cashflow_year_monitoring_cost(${i})`}>{d.monitoring_cost}</td>
      )
      var cashflow_year_elec_safety_cost= cashflow_year.map((d,i)=>
        <td key={`cashflow_year_elec_safety_cost(${i})`}>{d.elec_safety_cost}</td>
      )
      var cashflow_year_office_cost= cashflow_year.map((d,i)=>
        <td key={`cashflow_year_office_cost(${i})`}>{d.office_cost}</td>
      )
      var cashflow_year_other_cost= cashflow_year.map((d,i)=>
        <td key={`cashflow_year_other_cost(${i})`}>{d.other_cost}</td>
      )
      var cashflow_year_interest= cashflow_year.map((d,i)=>
        <td key={`cashflow_year_interest(${i})`}>{d.interest}</td>
      )
      var cashflow_year_tax= cashflow_year.map((d,i)=>
        <td key={`cashflow_year_tax(${i})`}>{d.tax}</td>
      )
      var cashflow_year_operation_cash_out= cashflow_year.map((d,i)=>
        <td key={`cashflow_year_operation_cash_out(${i})`}>{d.operation_cash_out}</td>
      )
      var cashflow_year_finance_cash= cashflow_year.map((d,i)=>
        <td key={`cashflow_year_finance_cash(${i})`}>{d.finance_cash}</td>
      )
      var cashflow_year_finance_cash_in= cashflow_year.map((d,i)=>
        <td key={`cashflow_year_finance_cash_in(${i})`}>{d.finance_cash_in}</td>
      )
      var cashflow_year_acqusition_asset= cashflow_year.map((d,i)=>
        <td key={`cashflow_year_acqusition_asset(${i})`}>{d.acqusition_asset}</td>
      )
      var cashflow_year_finance_cash_out= cashflow_year.map((d,i)=>
        <td key={`cashflow_year_finance_cash_out(${i})`}>{d.finance_cash_out}</td>
      )
      var cashflow_year_investment_cash= cashflow_year.map((d,i)=>
        <td key={`cashflow_year_investment_cash(${i})`}>{d.investment_cash}</td>
      )
      var cashflow_year_debt= cashflow_year.map((d,i)=>
        <td key={`cashflow_year_debt(${i})`}>{d.debt}</td>
      )
      var cashflow_year_equity= cashflow_year.map((d,i)=>
        <td key={`cashflow_year_equity(${i})`}>{d.equity}</td>
      )
      var cashflow_year_investment_cash_in= cashflow_year.map((d,i)=>
        <td key={`cashflow_year_investment_cash_in(${i})`}>{d.investment_cash_in}</td>
      )
      var cashflow_year_principal= cashflow_year.map((d,i)=>
        <td key={`cashflow_year_principal(${i})`}>{d.principal}</td>
      )
      var cashflow_year_investment_cash_out= cashflow_year.map((d,i)=>
        <td key={`cashflow_year_investment_cash_out(${i})`}>{d.investment_cash_out}</td>
      )
      var cashflow_year_cash_change= cashflow_year.map((d,i)=>
        <td key={`cashflow_year_cash_change(${i})`}>{d.cash_change}</td>
      )
      var cashflow_year_start_cash= cashflow_year.map((d,i)=>
        <td key={`cashflow_year_start_cash(${i})`}>{d.start_cash}</td>
      )
      var cashflow_year_end_cash= cashflow_year.map((d,i)=>
        <td key={`cashflow_year_end_cash(${i})`}>{d.end_cash}</td>
      )
      var cashflow_year_table=(
        <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp" >
        <thead>
          <tr>
            <th>기간</th>
             {cashflow_year_column}
            </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>영업활동으로 인한 현금흐름</strong></td>
             {cashflow_year_operation_cash}
          </tr>
          <tr>
            <td>예상 SMP 수입</td>
             {cashflow_year_smp_revenue}
          </tr>
          <tr>
            <td>예상 REC 수입</td>
             {cashflow_year_rec_revenue}
          </tr>
          <tr>
            <td><strong>영업활동으로 인한 현금유입</strong></td>
             {cashflow_year_operation_cash_in}
          </tr>
          <tr>
            <td>O&M비용</td>
             {cashflow_year_OM_cost}
          </tr>
          <tr>
            <td>모니터링비용</td>
             {cashflow_year_monitoring_cost}
          </tr>
          <tr>
            <td>전기안전관리자 선임비용</td>
             {cashflow_year_elec_safety_cost}
          </tr>
          <tr>
            <td>사무관리비용</td>
             {cashflow_year_office_cost}
          </tr>
          <tr>
            <td>기타비용</td>
             {cashflow_year_other_cost}
          </tr>
          <tr>
            <td>추정세금</td>
             {cashflow_year_tax}
          </tr>
          <tr>
            <td><strong>영업활동으로 인한 현금유출</strong></td>
             {cashflow_year_operation_cash_out}
          </tr>
          <tr>
            <td><strong>재무활동으로 인한 현금흐름</strong></td>
             {cashflow_year_finance_cash}
          </tr>
          <tr>
            <td><strong>재무활동으로 인한 현금유입</strong></td>
             {cashflow_year_finance_cash_in}
          </tr>
          <tr>
            <td><strong>유형자산구입</strong></td>
             {cashflow_year_acqusition_asset}
          </tr>
          <tr>
            <td><strong>재무활동으로 인한 현금유출</strong></td>
             {cashflow_year_finance_cash_out}
          </tr>
          <tr>
            <td><strong>투자활동으로 인한 현금흐름</strong></td>
             {cashflow_year_finance_cash}
          </tr>
          <tr>
            <td>자본금납입</td>
             {cashflow_year_equity}
          </tr>
          <tr>
            <td>차입금</td>
             {cashflow_year_debt}
          </tr>
          <tr>
            <td><strong>투자활동으로 인한 현금유입</strong></td>
             {cashflow_year_finance_cash_in}
          </tr>
          <tr>
            <td>차입금 원금 상환</td>
             {cashflow_year_principal}
          </tr>
          <tr>
            <td><strong>투자활동으로 인한 현금유출</strong></td>
             {cashflow_year_finance_cash_out}
          </tr>
          <tr>
            <td><strong>총 현금변화</strong></td>
             {cashflow_year_cash_change}
          </tr>
          <tr>
            <td>기초현금</td>
             {cashflow_year_start_cash}
          </tr>
          <tr>
            <td>기말현금</td>
            {cashflow_year_end_cash}
          </tr>
        </tbody>
        </table>
      )

      var cashflow_quarter=this.state.data.Item.response.cashflow_quarter
      var cashflow_quarter_column=cashflow_quarter.map((d,i)=>
        <th key={`cashflow_quarter_yearly_date(${i})`}>{datechangeQuarter(d.date)}</th>
      )
      var cashflow_quarter_operation_cash=cashflow_quarter.map((d,i)=>
        <th key={`cashflow_quarter_operation_cash(${i})`}>{d.operation_cash}</th>
      )
      var cashflow_quarter_smp_revenue= cashflow_quarter.map((d,i)=>
        <td key={`cashflow_quarter_smp_revenue(${i})`}>{d.smp_revenue}</td>
      )
      var cashflow_quarter_rec_revenue= cashflow_quarter.map((d,i)=>
        <td key={`cashflow_quarter_rec_revenue(${i})`}>{d.rec_revenue}</td>
      )
      var cashflow_quarter_operation_cash_in= cashflow_quarter.map((d,i)=>
        <td key={`cashflow_quarter_operation_cash_in(${i})`}>{d.operation_cash_in}</td>
      )
      var cashflow_quarter_OM_cost= cashflow_quarter.map((d,i)=>
        <td key={`cashflow_quarter_OM_cost(${i})`}>{d.OM_cost}</td>
      )
      var cashflow_quarter_monitoring_cost= cashflow_quarter.map((d,i)=>
        <td key={`cashflow_quarter_monitoring_cost(${i})`}>{d.monitoring_cost}</td>
      )
      var cashflow_quarter_elec_safety_cost= cashflow_quarter.map((d,i)=>
        <td key={`cashflow_quarter_elec_safety_cost(${i})`}>{d.elec_safety_cost}</td>
      )
      var cashflow_quarter_office_cost= cashflow_quarter.map((d,i)=>
        <td key={`cashflow_quarter_office_cost(${i})`}>{d.office_cost}</td>
      )
      var cashflow_quarter_other_cost= cashflow_quarter.map((d,i)=>
        <td key={`cashflow_quarter_other_cost(${i})`}>{d.other_cost}</td>
      )
      var cashflow_quarter_interest= cashflow_quarter.map((d,i)=>
        <td key={`cashflow_quarter_interest(${i})`}>{d.interest}</td>
      )
      var cashflow_quarter_tax= cashflow_quarter.map((d,i)=>
        <td key={`cashflow_quarter_tax(${i})`}>{d.tax}</td>
      )
      var cashflow_quarter_operation_cash_out= cashflow_quarter.map((d,i)=>
        <td key={`cashflow_quarter_operation_cash_out(${i})`}>{d.operation_cash_out}</td>
      )
      var cashflow_quarter_finance_cash= cashflow_quarter.map((d,i)=>
        <td key={`cashflow_quarter_finance_cash(${i})`}>{d.finance_cash}</td>
      )
      var cashflow_quarter_finance_cash_in= cashflow_quarter.map((d,i)=>
        <td key={`cashflow_quarter_finance_cash_in(${i})`}>{d.finance_cash_in}</td>
      )
      var cashflow_quarter_acqusition_asset= cashflow_quarter.map((d,i)=>
        <td key={`cashflow_quarter_acqusition_asset(${i})`}>{d.acqusition_asset}</td>
      )
      var cashflow_quarter_finance_cash_out= cashflow_quarter.map((d,i)=>
        <td key={`cashflow_quarter_finance_cash_out(${i})`}>{d.finance_cash_out}</td>
      )
      var cashflow_quarter_investment_cash= cashflow_quarter.map((d,i)=>
        <td key={`cashflow_quarter_investment_cash(${i})`}>{d.investment_cash}</td>
      )
      var cashflow_quarter_debt= cashflow_quarter.map((d,i)=>
        <td key={`cashflow_quarter_debt(${i})`}>{d.debt}</td>
      )
      var cashflow_quarter_equity= cashflow_quarter.map((d,i)=>
        <td key={`cashflow_quarter_equity(${i})`}>{d.equity}</td>
      )
      var cashflow_quarter_investment_cash_in= cashflow_quarter.map((d,i)=>
        <td key={`cashflow_quarter_investment_cash_in(${i})`}>{d.investment_cash_in}</td>
      )
      var cashflow_quarter_principal= cashflow_quarter.map((d,i)=>
        <td key={`cashflow_quarter_principal(${i})`}>{d.principal}</td>
      )
      var cashflow_quarter_investment_cash_out= cashflow_quarter.map((d,i)=>
        <td key={`cashflow_quarter_investment_cash_out(${i})`}>{d.investment_cash_out}</td>
      )
      var cashflow_quarter_cash_change= cashflow_quarter.map((d,i)=>
        <td key={`cashflow_quarter_cash_change(${i})`}>{d.cash_change}</td>
      )
      var cashflow_quarter_start_cash= cashflow_quarter.map((d,i)=>
        <td key={`cashflow_quarter_start_cash(${i})`}>{d.start_cash}</td>
      )
      var cashflow_quarter_end_cash= cashflow_quarter.map((d,i)=>
        <td key={`cashflow_quarter_end_cash(${i})`}>{d.end_cash}</td>
      )
      var cashflow_quarter_table=(
        <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp" >
        <thead>
          <tr>
            <th>기간</th>
             {cashflow_quarter_column}
            </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>영업활동으로 인한 현금흐름</strong></td>
             {cashflow_quarter_operation_cash}
          </tr>
          <tr>
            <td>예상 SMP 수입</td>
             {cashflow_quarter_smp_revenue}
          </tr>
          <tr>
            <td>예상 REC 수입</td>
             {cashflow_quarter_rec_revenue}
          </tr>
          <tr>
            <td><strong>영업활동으로 인한 현금유입</strong></td>
             {cashflow_quarter_operation_cash_in}
          </tr>
          <tr>
            <td>O&M비용</td>
             {cashflow_quarter_OM_cost}
          </tr>
          <tr>
            <td>모니터링비용</td>
             {cashflow_quarter_monitoring_cost}
          </tr>
          <tr>
            <td>전기안전관리자 선임비용</td>
             {cashflow_quarter_elec_safety_cost}
          </tr>
          <tr>
            <td>사무관리비용</td>
             {cashflow_quarter_office_cost}
          </tr>
          <tr>
            <td>기타비용</td>
             {cashflow_quarter_other_cost}
          </tr>
          <tr>
            <td>추정세금</td>
             {cashflow_quarter_tax}
          </tr>
          <tr>
            <td><strong>영업활동으로 인한 현금유출</strong></td>
             {cashflow_quarter_operation_cash_out}
          </tr>
          <tr>
            <td><strong>재무활동으로 인한 현금흐름</strong></td>
             {cashflow_quarter_finance_cash}
          </tr>
          <tr>
            <td><strong>재무활동으로 인한 현금유입</strong></td>
             {cashflow_quarter_finance_cash_in}
          </tr>
          <tr>
            <td><strong>유형자산구입</strong></td>
             {cashflow_quarter_acqusition_asset}
          </tr>
          <tr>
            <td><strong>재무활동으로 인한 현금유출</strong></td>
             {cashflow_quarter_finance_cash_out}
          </tr>
          <tr>
            <td><strong>투자활동으로 인한 현금흐름</strong></td>
             {cashflow_quarter_finance_cash}
          </tr>
          <tr>
            <td>자본금납입</td>
             {cashflow_quarter_equity}
          </tr>
          <tr>
            <td>차입금</td>
             {cashflow_quarter_debt}
          </tr>
          <tr>
            <td><strong>투자활동으로 인한 현금유입</strong></td>
             {cashflow_quarter_finance_cash_in}
          </tr>
          <tr>
            <td>차입금 원금 상환</td>
             {cashflow_quarter_principal}
          </tr>
          <tr>
            <td><strong>투자활동으로 인한 현금유출</strong></td>
             {cashflow_quarter_finance_cash_out}
          </tr>
          <tr>
            <td><strong>총 현금변화</strong></td>
             {cashflow_quarter_cash_change}
          </tr>
          <tr>
            <td>기초현금</td>
             {cashflow_quarter_start_cash}
          </tr>
          <tr>
            <td>기말현금</td>
            {cashflow_quarter_end_cash}
          </tr>
        </tbody>
        </table>
      )

      var cashflow_month=this.state.data.Item.response.cashflow_quarter
      var cashflow_month_column=cashflow_month.map((d,i)=>
          <th key={`cashflow_quarter_yearly_date(${i})`}>{datechangeMonth(d.date)}</th>
        )
      var cashflow_month_operation_cash=cashflow_month.map((d,i)=>
          <th key={`cashflow_month_operation_cash(${i})`}>{d.operation_cash}</th>
        )
      var cashflow_month_smp_revenue= cashflow_month.map((d,i)=>
          <td key={`cashflow_month_smp_revenue(${i})`}>{d.smp_revenue}</td>
        )
      var cashflow_month_rec_revenue= cashflow_month.map((d,i)=>
          <td key={`cashflow_month_rec_revenue(${i})`}>{d.rec_revenue}</td>
        )
      var cashflow_month_operation_cash_in= cashflow_month.map((d,i)=>
          <td key={`cashflow_month_operation_cash_in(${i})`}>{d.operation_cash_in}</td>
        )
      var cashflow_month_OM_cost= cashflow_month.map((d,i)=>
          <td key={`cashflow_month_OM_cost(${i})`}>{d.OM_cost}</td>
        )
      var cashflow_month_monitoring_cost= cashflow_month.map((d,i)=>
          <td key={`cashflow_month_monitoring_cost(${i})`}>{d.monitoring_cost}</td>
        )
      var cashflow_month_elec_safety_cost= cashflow_month.map((d,i)=>
          <td key={`cashflow_month_elec_safety_cost(${i})`}>{d.elec_safety_cost}</td>
        )
      var cashflow_month_office_cost= cashflow_month.map((d,i)=>
          <td key={`cashflow_month_office_cost(${i})`}>{d.office_cost}</td>
        )
      var cashflow_month_other_cost= cashflow_month.map((d,i)=>
          <td key={`cashflow_month_other_cost(${i})`}>{d.other_cost}</td>
        )
      var cashflow_month_interest= cashflow_month.map((d,i)=>
          <td key={`cashflow_month_interest(${i})`}>{d.interest}</td>
        )
      var cashflow_month_tax= cashflow_month.map((d,i)=>
          <td key={`cashflow_month_tax(${i})`}>{d.tax}</td>
        )
      var cashflow_month_operation_cash_out= cashflow_month.map((d,i)=>
          <td key={`cashflow_month_operation_cash_out(${i})`}>{d.operation_cash_out}</td>
        )
      var cashflow_month_finance_cash= cashflow_month.map((d,i)=>
          <td key={`cashflow_month_finance_cash(${i})`}>{d.finance_cash}</td>
        )
      var cashflow_month_finance_cash_in= cashflow_month.map((d,i)=>
          <td key={`cashflow_month_finance_cash_in(${i})`}>{d.finance_cash_in}</td>
        )
      var cashflow_month_acqusition_asset= cashflow_month.map((d,i)=>
          <td key={`cashflow_month_acqusition_asset(${i})`}>{d.acqusition_asset}</td>
        )
      var cashflow_month_finance_cash_out= cashflow_month.map((d,i)=>
          <td key={`cashflow_month_finance_cash_out(${i})`}>{d.finance_cash_out}</td>
        )
      var cashflow_month_investment_cash= cashflow_month.map((d,i)=>
          <td key={`cashflow_month_investment_cash(${i})`}>{d.investment_cash}</td>
        )
      var cashflow_month_debt= cashflow_month.map((d,i)=>
          <td key={`cashflow_month_debt(${i})`}>{d.debt}</td>
        )
      var cashflow_month_equity= cashflow_month.map((d,i)=>
          <td key={`cashflow_month_equity(${i})`}>{d.equity}</td>
        )
      var cashflow_month_investment_cash_in= cashflow_month.map((d,i)=>
          <td key={`cashflow_month_investment_cash_in(${i})`}>{d.investment_cash_in}</td>
        )
      var cashflow_month_principal= cashflow_month.map((d,i)=>
          <td key={`cashflow_month_principal(${i})`}>{d.principal}</td>
        )
      var cashflow_month_investment_cash_out= cashflow_month.map((d,i)=>
          <td key={`cashflow_month_investment_cash_out(${i})`}>{d.investment_cash_out}</td>
        )
      var cashflow_month_cash_change= cashflow_month.map((d,i)=>
          <td key={`cashflow_month_cash_change(${i})`}>{d.cash_change}</td>
        )
      var cashflow_month_start_cash= cashflow_month.map((d,i)=>
          <td key={`cashflow_month_start_cash(${i})`}>{d.start_cash}</td>
        )
      var cashflow_month_end_cash= cashflow_month.map((d,i)=>
          <td key={`cashflow_month_end_cash(${i})`}>{d.end_cash}</td>
        )
      var cashflow_month_table=(
          <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp" >
          <thead>
            <tr>
              <th>기간</th>
               {cashflow_month_column}
              </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>영업활동으로 인한 현금흐름</strong></td>
               {cashflow_month_operation_cash}
            </tr>
            <tr>
              <td>예상 SMP 수입</td>
               {cashflow_month_smp_revenue}
            </tr>
            <tr>
              <td>예상 REC 수입</td>
               {cashflow_month_rec_revenue}
            </tr>
            <tr>
              <td><strong>영업활동으로 인한 현금유입</strong></td>
               {cashflow_month_operation_cash_in}
            </tr>
            <tr>
              <td>O&M비용</td>
               {cashflow_month_OM_cost}
            </tr>
            <tr>
              <td>모니터링비용</td>
               {cashflow_month_monitoring_cost}
            </tr>
            <tr>
              <td>전기안전관리자 선임비용</td>
               {cashflow_month_elec_safety_cost}
            </tr>
            <tr>
              <td>사무관리비용</td>
               {cashflow_month_office_cost}
            </tr>
            <tr>
              <td>기타비용</td>
               {cashflow_month_other_cost}
            </tr>
            <tr>
              <td>추정세금</td>
               {cashflow_month_tax}
            </tr>
            <tr>
              <td><strong>영업활동으로 인한 현금유출</strong></td>
               {cashflow_month_operation_cash_out}
            </tr>
            <tr>
              <td><strong>재무활동으로 인한 현금흐름</strong></td>
               {cashflow_month_finance_cash}
            </tr>
            <tr>
              <td><strong>재무활동으로 인한 현금유입</strong></td>
               {cashflow_month_finance_cash_in}
            </tr>
            <tr>
              <td><strong>유형자산구입</strong></td>
               {cashflow_month_acqusition_asset}
            </tr>
            <tr>
              <td><strong>재무활동으로 인한 현금유출</strong></td>
               {cashflow_month_finance_cash_out}
            </tr>
            <tr>
              <td><strong>투자활동으로 인한 현금흐름</strong></td>
               {cashflow_month_finance_cash}
            </tr>
            <tr>
              <td>자본금납입</td>
               {cashflow_month_equity}
            </tr>
            <tr>
              <td>차입금</td>
               {cashflow_month_debt}
            </tr>
            <tr>
              <td><strong>투자활동으로 인한 현금유입</strong></td>
               {cashflow_month_finance_cash_in}
            </tr>
            <tr>
              <td>차입금 원금 상환</td>
               {cashflow_month_principal}
            </tr>
            <tr>
              <td><strong>투자활동으로 인한 현금유출</strong></td>
               {cashflow_month_finance_cash_out}
            </tr>
            <tr>
              <td><strong>총 현금변화</strong></td>
               {cashflow_month_cash_change}
            </tr>
            <tr>
              <td>기초현금</td>
               {cashflow_month_start_cash}
            </tr>
            <tr>
              <td>기말현금</td>
              {cashflow_month_end_cash}
            </tr>
          </tbody>
          </table>
        )

      var result_table= (
      <Board name="시뮬레이션 결과">
        <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">
          <input type="checkbox" className="mdl-checkbox__input" checked={this.state.income_year} onChange={this.handleIncomeYearChange}/>
          <span className="mdl-checkbox__label">연간 손익계산서</span>
        </label>
        <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">
          <input type="checkbox" className="mdl-checkbox__input" checked={this.state.income_quarter} onChange={this.handleIncomeQuarterChange}/>
          <span className="mdl-checkbox__label">분기별 손익계산서</span>
        </label>
        <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">
          <input type="checkbox" className="mdl-checkbox__input" checked={this.state.income_month} onChange={this.handleIncomeMonthChange}/>
          <span className="mdl-checkbox__label">월별 손익계산서</span>
        </label>
        <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">
          <input type="checkbox" className="mdl-checkbox__input" checked={this.state.cashflow_year} onChange={this.handleCashFlowYearChange} />
          <span className="mdl-checkbox__label">연간예상현금흐름표</span>
        </label>
        <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">
          <input type="checkbox" className="mdl-checkbox__input" checked={this.state.cashflow_quarter} onChange={this.handleCashFlowQuarterChange}/>
          <span className="mdl-checkbox__label">분기별예상현금흐름표</span>
        </label>
        <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">
          <input type="checkbox" className="mdl-checkbox__input" checked={this.state.cashflow_month}
            onChange={this.handleCashFlowMonthChange}/>
          <span className="mdl-checkbox__label">월별예상현금흐름표</span>
        </label>
      </Board>
      )
    }
    return(
      <div className="overflow">
        {result_table}
        {(this.state.income_year)?<Board name="연 단위 손익계산서">{income_year_table}</Board>:<div></div>}
        {(this.state.income_quarter)?<Board name="분기 단위 손익계산서">{income_quarter_table}</Board>:<div></div>}
        {(this.state.income_month)?<Board name="월 단위 손익계산서">{income_month_table}</Board>:<div></div>}
        {(this.state.cashflow_year)?<Board name="연 단위 현금흐름표">{cashflow_year_table}</Board>:<div></div>}
        {(this.state.cashflow_quarter)?<Board name="분기 단위 현금흐름표">{cashflow_quarter_table}</Board>:<div></div>}
        {(this.state.cashflow_month)?<Board name="월 단위 현금흐름표">{cashflow_month_table}</Board>:<div></div>}
      </div>
    )
  }
}
