import React from 'react';
import {Layout,Header,Drawer,Board} from '../components/layout';

export class EconomicPage extends React.Component{
  constructor(props){
    super(props)
    this.state={}
  }
  render(){
    return(
      <Layout>
        <Board name="FERMI">
          <p>
            Fermi는 재생에너지 포털 프로젝트입니다. 재생에너지 사업검토에 필요한 가격정보를 제공합니다.
          </p>
        </Board>
      </Layout>
    )
  }
}
