import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {MainPage} from './pages/mainPage';
import {SmpPage} from './pages/smpPage';
import {RecPage} from './pages/recPage';
import {EconomicPage} from './pages/economicPage';
import {Layout} from './components/layout';
require('./styles.css');

ReactDOM.render(
  <Layout>
    <Router>
      <Switch>
        <Route exact path='/' component={MainPage} />
        <Route exact path='/smp_price' component={SmpPage} />
        <Route exact path='/rec_price' component={RecPage} />
        <Route exact path='/economic' component={EconomicPage} />
      </Switch>
    </Router>
  </Layout>
  ,document.getElementById('body')
);
//ReactDOM.render(<Layout />, document.getElementById('body'));
