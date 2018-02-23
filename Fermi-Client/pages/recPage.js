import React from 'react';
import {Header,Drawer,Table} from '../components/layout'

export class RecPage extends React.Component{
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
