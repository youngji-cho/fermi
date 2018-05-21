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
    console.log(this.state);
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
