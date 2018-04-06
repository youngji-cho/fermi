import React from 'react';
import {withRouter} from "react-router-dom";
import {Layout,Header,Drawer,Board} from '../components/layout';
import {SimulationInput,SimulationOutput} from '../components/simulation';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

export class EconomicPage extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <Layout>
        <Router>
          <Switch>
            <Route exact path='/economic' component={SimulationInput} />
          </Switch>
        </Router>
      </Layout>
    )
  }
}
