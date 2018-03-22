import React from 'react';
import {Header,Drawer,Board} from '../components/layout';
import {RecChartA,RecChartB,RecChartC} from '../components/charts';
import {RecTableA} from '../components/table';

export class RecPage extends React.Component{
  constructor(props){
    super(props)
    this.state={rec_dataA:[]}
  }
  render(){
    return(
      <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
        <Header />
        <Drawer />
        <main className="mdl-layout__content mdl-color--grey-100">
          <div className="mdl-grid demo-content">
            <Board name="REC 가격">
              <p> 한국에서는 공급공급의무화제도(RPS,Renewable Eenergy Portfolio)를 채택함에 따라,발전자회사는 아래의 공급의무화비율에 따라 의무적으로 신재생에너지를 공급해야하고, 부족한 부분은 신재생에너지 공급인증서(REC,Renewable Energy Certificate)를 구입하여서 충당할수 있습니다. REC는 현물시장에서 구입하거나, 장기계약시장에서 거래가 가능합니다.
              </p>
              <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp overflow" >
                <thead>
                  <tr>
                    <th>2012년</th><th>2013년</th><th>2014년</th><th>2015년</th>
                    <th>2016년</th><th>2017년</th><th>2018년</th><th>2019년</th>
                    <th>2020년</th><th>2021년</th><th>2022년</th><th>2023년 이후</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2%</td><td>2.5%</td><td>3.0%</td><td>3.0%</td>
                    <td>3.5%</td><td>4.0%</td><td>5.0%</td><td>6.0%</td>
                    <td>7.0%</td><td>8.0%</td><td>9.0%</td><td>10.0%</td>
                  </tr>
                </tbody>
              </table>
            </Board>
            <Board name="REC통합시장 양방향거래시장 그래프">
              <p> 현물시장에서 거래중인 REC가격 중 평균가(종가)기준입니다. 양방향 거래가 시작된 17년 3월 28일 이후 부터 조회가능합니다.</p>
              <RecChartA />
            </Board>
            <Board name="REC통합시장 양방향거래시장표">
              <RecTableA />
            </Board>
            <Board name="장기계약시장">
            <p> 17년부터 시작된 SMP+REC고정가격시장의 입찰 결과입니다.평균가를 조회가능합니다.</p>
            <div className="table" style={{"overflowX":"auto"}}>
            <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp" >
              <thead>
                <tr>
                  <th>구분</th><th>평균가(육지)</th><th>평균가(제주)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>17년 하반기</td><td>184,595원</td><td>192,000원</td>
                </tr>
                <tr>
                  <td>17년 상반기</td><td>181,486원</td><td>186,726원</td>
                </tr>
              </tbody>
            </table>
            </div>
            </Board>
          </div>
        </main>
      </div>
    )
  }
}
