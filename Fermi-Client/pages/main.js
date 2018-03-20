import React from 'react';
import {Layout} from '../components/layout'
import {table} from

class MainPage extends React.Component{
  constructor(props){
    super(props)
    this.state={
      tables:['main','smp_main','rec_main']
    }
  }



  render(){
    return(<Layout />)
  }
}
