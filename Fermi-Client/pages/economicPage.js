import React from 'react';
import {Layout,Header,Drawer,Board} from '../components/layout';
import {Simulation} from '../components/simulation';

export class EconomicPage extends React.Component{
  constructor(props){
    super(props)
    this.state={}
  }
  render(){
    return(
      <Layout>
        <Board name="경제성 분석 시뮬레이션">
          <p>
            경제성분석 시나리오입니다. 다음값을 입력하시면 자동으로 시뮬레이션을 해드립니다. 
          </p>
          <Simulation />
        </Board>
      </Layout>
    )
  }
}
