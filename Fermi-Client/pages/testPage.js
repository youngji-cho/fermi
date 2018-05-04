import React from 'react';
import {withRouter} from "react-router-dom";
import {Layout,Header,Drawer,Board} from '../components/layout';
import {SimulationOutput} from '../components/test';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {datechange,datechangeMonth} from "../../util";
import Calendar from 'react-calendar';

export class TestPage extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <Router>
        <Switch>
          <Route exact path='/test' component={SimulationOutput} />
        </Switch>
      </Router>
    )
  }
}
