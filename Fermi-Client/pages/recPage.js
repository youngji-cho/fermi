import React from 'react';
import {Header,Drawer,Table} from '../components/layout'

export class RecPage extends React.Component{
  constructor(props){
    super(props)
    this.state={
      exp1: "REC는 Mwh당 거래가 기본입니다. REC는 도매시장에서 거래를 할수 있고, 장기계약을 맺어서 거래를 할 수도 있습니다. 도매시장의 가격은 매주 2회 결정됩니다. REC장기계약의 경우 에너지 관리공단 주관하에 실시됩니다. 17년 부터는 REC가격과 SMP가격을 통합해서 20년 장기계약이 가능합니다. 연2회 시행됩니다.",
      exp2: "도매시장에서 매주 2회 거래되는 가격입니다. 증권시장처럼 양방향 입찰로 운영되기 때문에 최저,최고,평균가가 존재합니다. 또한, 제주/육지/전체로 가격이 구분됩니다." ,
      exp3: "도매시장에서 매월 거래되는 REC거래량입니다. 제주/육지/전체로 구분되며, 매도희망,매수희망,체결량을 나타냅니다.",
      exp4: "매년 2회열리는 장기계약시장의 거래량을 나타냅니다."
    }
  }
  render(){
    return(
      <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
        <Header />
        <Drawer />
        <main className="mdl-layout__content mdl-color--grey-100">
          <div className="mdl-grid demo-content">
            <Table name="REC 가격" content={this.state.exp1}/>
            <Table name="도매시장 가격" content={this.state.exp2} />
            <Table name="도매시장 거래량" content={this.state.exp3} />
            <Table name="장기계약시장" content={this.state.exp4} />
          </div>
        </main>
      </div>
    )
  }
}
