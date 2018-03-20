import React from 'react';
import ReactDOM from 'react-dom';
import {Router,BrowserRouter, Route, Switch} from 'react-router-dom'
import {MainPage} from './pages/mainPage';
import {SmpPage} from './pages/smpPage';
import {RecPage} from './pages/recPage';
require('./styles.css');

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={MainPage} />
      <Route exact path='/smp_price' component={SmpPage} />
      <Route exact path='/rec_price' component={RecPage} />
    </Switch>
  </BrowserRouter>
  ,document.getElementById('body')
);
//ReactDOM.render(<Layout />, document.getElementById('body'));
