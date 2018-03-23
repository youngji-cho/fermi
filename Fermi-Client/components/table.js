import React from 'react';
import {TimeButton} from './layout';
import {default as ExcelFile,ExcelSheet,ExcelColumn} from "react-data-export";

export class RecTableA extends React.Component{
  constructor(props){
    super(props)
    this.state={selected:"total",data:[]};
    this.handleClick=this.handleClick.bind(this);
  }
  componentDidMount() {
    fetch(`/rec_data2`).then(
      response => {
       if (response.ok) {
         return response.json();
        }
        throw new Error('Request failed!');
      }, networkError => {
        console.log(networkError.message);
      }).then(jsonResponse =>this.setState({data:jsonResponse}));
  }
  handleClick(e){
    this.setState({selected:e.target.value});
    console.log(this.state.selected);
  }
  render(){
    let data = this.state.data.filter(d=>d.land_or_jeju===this.state.selected);
    let table= data.map(d=>
    <tr>
      <td>{d.date}</td>
      <td>{d.land_or_jeju}</td>
      <td>{d.average_price}</td>
      <td>{d.lowest_price}</td>
      <td>{d.highest_price}</td>
      <td>{d.transaction_money}</td>
      <td>{d.sell_deals}</td>
      <td>{d.sell_amount}</td>
      <td>{d.buy_deals}</td>
      <td>{d.buy_amount}</td>
      <td>{d.sucess_deals}</td>
      <td>{d.success_amount}</td>
    </tr>
    );
    let excel=(
      <ExcelFile>
      <ExcelSheet data={this.state.data} name="REC">
       <ExcelColumn label="시기" value="date" />
       <ExcelColumn label="육지/제주 구분 " value="land_or_jeju" />
       <ExcelColumn label="평균가" value="average_price" />
       <ExcelColumn label="최저가" value="lowest_price" />
       <ExcelColumn label="최고가" value="highest_price" />
       <ExcelColumn label="거래금액" value="transaction_money" />
       <ExcelColumn label="매도건수" value="sell_deals" />
       <ExcelColumn label="매도물량 " value="sell_amount" />
       <ExcelColumn label="매수주문건수" value="buy_deals" />
       <ExcelColumn label="매수주문물량" value="buy_amount" />
       <ExcelColumn label="체결건수" value="sucess_deals" />
       <ExcelColumn label="체결물량" value="success_amount" />
      </ExcelSheet>
     </ExcelFile>);
    return(
      <div className="overflow">
        {excel}
        <TimeButton buttonName="통합" buttonValue="total" onClick={this.handleClick} />
        <TimeButton buttonName="육지" buttonValue="land" onClick={this.handleClick} />
        <TimeButton buttonName="제주" buttonValue="jeju" onClick={this.handleClick} />
        <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp" >
        <thead>
          <tr>
            <th>기간</th><th>육지/제주구분</th><th>평균가</th>
            <th>최저가</th><th>최고가</th><th>거래금액</th>
            <th>매도건수</th><th>매도물량</th><th>매수주문건수</th>
            <th>매수주문물량</th><th>체결건수</th><th>체결물량</th>
          </tr>
        </thead>
        <tbody>
          {table}
        </tbody>
        </table>
      </div>
    )
  }
}

export class SmpTableA extends React.Component{
  constructor(props){
    super(props)
    this.state={data:[]};
  }
  componentDidMount() {
    fetch(`/smp_data1`).then(
      response => {
       if (response.ok) {
         return response.json();
        }
        throw new Error('Request failed!');
      }, networkError => {
        console.log(networkError.message);
      }).then(jsonResponse =>this.setState({data:jsonResponse}));
  }
  render(){
    console.log(this.state.data)
    let table= this.state.data.map(d=>
    <tr>
      <td>{d.date}</td>
      <td>{d.land_price}</td>
      <td>{d.jeju_price}</td>
      <td>{d.total_price}</td>
    </tr>
    );
    let excel=(
      <ExcelFile>
      <ExcelSheet data={this.state.data} name="REC">
       <ExcelColumn label="시기" value="date" />
       <ExcelColumn label="육지 SMP" value="land_price" />
       <ExcelColumn label="제주 SMP" value="jeju_price" />
       <ExcelColumn label="통합 SMP" value="total_price" />
      </ExcelSheet>
     </ExcelFile>);
    return(
      <div className="overflow">
        {excel}
        <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp" >
        <thead>
          <tr>
            <th>기간</th><th>육지 SMP</th><th>제주 SMP</th>
            <th>통합 SMP</th>
          </tr>
        </thead>
        <tbody>
          {table}
        </tbody>
        </table>
      </div>
    )
  }
}
