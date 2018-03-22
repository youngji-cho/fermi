import React from 'react';
import {TimeButton} from './layout';

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
    return(
      <div>
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
