import React from 'react';
import {Header,Drawer,Table} from '../components/layout'
import {SmpChartA,SmpChartB} from '../components/charts';

export class SmpPage extends React.Component{
  constructor(props){
    super(props)
    this.state={}
  }
  render(){
    return(
      <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
        <Header />
        <Drawer />
        <main className="mdl-layout__content mdl-color--grey-100">
          <div className="mdl-grid demo-content">
            <Table name="SMP 가격">
              <p>
              계통한계가격(SMP,Sytem Marginal Price)은 전력시장에서 거래되는 모든 발전소에 적용되는 기준가격입니다. 발전회사는 전력을 판매하고, 한국전력을 구매해야 합니다. 이때 중간에서 가격을 결정하고, 정산을 하는 기관이 한국전력거래소(KRX, Korea Power Exchange) 입니다. <br /><br />
              계통한계가격은 한국전력거래소에서 거래되는 전력의 시간대별 기준단가라고 쉽게 정의할 수 있습니다. 한국전력거래소는 전력시장을 총괄적으로 운영합니다. 24시간 전에 항상 다음 24시간의 전력수요를 예측해서 각 발전소마다 얼만큼 생산할지 지시를 합니다. 이를 급전(Dispatch)지시라고 합니다. 급전지시는 가장 가격이 싼 기준으로 순차적으로 지시됩니다. <br /><br />
              <img src="https://s3.ap-northeast-2.amazonaws.com/fermi-public/smp_pricing.png" alt="smp_dispatch" height="100%" width="100%" />
              <br /><br />
              재생에너지 전력판매대금은 계통한계가격을 기준으로 정산 받습니다. 다만,규모에 따라 정산되는 방식이 조금 다릅니다. 1Mw 이상 대형 발전소는 전력거래소에 회원가입을 해서 생산된 전력에 대해서 시간당 계통한계가격으로 정산 받습니다. 1Mw이하의 소규모 발전소의 경우 전력거래소 회원가입이 불가능한 것은 아니지만, 대부분 한국전력과 직접 전력구매계약(Power Purchase Agreement)를 맺습니다. 이 경우 생산된 전력을 거래소를 거치지 않고, 한국전력으로 직접판매합니다. 이때 기준 가격은 월간 가중평균 계통한계가격으로 계산됩니다. 시간마다 가격이 변동되는 것이 아니라, 생산된 전력의 총액을 월간 가중평균 계통한계가격으로 곱해서 매월 대금을 정산 받습니다.
              <br /><br />
              재생에너지 경제성 분석에서 쓰이는 대부분의 수치인 월간가중평균가격이 조회가능합니다.(실시간 자료 추후 업데이트 예정)
              </p>
            </Table>
            <Table name="SMP 월간가중평균가격 그래프">
              <p>재생에너지 발전에서 가장 많이 쓰이는 월간 가중평균 가격입니다. </p>
              <SmpChartA />
            </Table>
            <Table name="SMP 월간가중평균가격 그래프(물가상승률보정)">
              <p> 계통한계가격은 장기간에 걸쳐서 데이터가 존재하므로 물가상승률에 따라서 보정한 계통한계가격입니다 물가상승률은 소비자 물가상승률(CPI,Consumer Price Index)에 의거합니다 </p>
            </Table>
          </div>
        </main>
      </div>
    )
  }
}
