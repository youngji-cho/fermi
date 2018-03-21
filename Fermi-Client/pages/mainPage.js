import React from 'react';
import {Layout,Header,Drawer,Table} from '../components/layout';
import {SmpChartA,RecChartA} from '../components/charts';

export class MainPage extends React.Component{
  constructor(props){
    super(props)
    this.state={}
  }
  render(){
    return(
      <Layout>
        <Table name="fermi">
          <p>
            Fermi는 재생에너지 포털 프로젝트입니다. 재생에너지 사업검토에 필요한 가격정보를 제공합니다.
          </p>
        </Table>
        <Table name="SMP 가격">
          <p>
            전력도매시장 가격인 계통한계가격(SMP, System Marginal Price)의 가격입니다. 아래의 그래프는 재생에너지 발전에서 많이 쓰는 월간가중평균 계통한계가격을 나타냅니다.(그래프에 마우스로 점을 클릭하면 가격을 조회할수 있습니다)
          </p>
          <SmpChartA />
          <div className="mdl-card__actions mdl-card--border">
            <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="/smp_price">상세보기</a>
          </div>
        </Table>
        <Table name="REC 가격" content={this.state.exp3}>
          <p> 재생에너지 발전의 대가로 주어지는 재생에너지공급인증서(REC, Renewable Energy Certificate)의 가격입니다. 제주,육지,종합을 기준으로 볼수 있습니다.(그래프에 마우스로 점을 클릭하면 가격을 조회할수 있습니다) <br />
          </p>
          <RecChartA />
          <div className="mdl-card__actions mdl-card--border">
            <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="/rec_price">상세보기</a>
          </div>
        </Table>
      </Layout>
    )
  }
}

/*
export class MainPage extends React.Component{
  render(){
    return(
      <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
        <Header />
        <Drawer />
        <main className="mdl-layout__content mdl-color--grey-100">
          <div className="mdl-grid demo-content">
            <Table name="fermi" content="fermi는 재생에너지 포털입니다."/>
            <Table name="SMP 가격" content="계통한계가격입니다. "/>
            <Table name="REC 가격" content="신재생에너지 공급인증서의 가격입니다."/>
          </div>
        </main>
      </div>
    )
  }
}
*/
