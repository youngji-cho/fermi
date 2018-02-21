import React from 'react';
import ReactDOM from 'react-dom';
import {Router,BrowserRouter, Route, Switch} from 'react-router-dom'
import {Layout} from './components/layout';
import {Table} from './components/table';
import {Main} from './pages/Main';
import {Smp} from './pages/Smp';
import {Rec} from './pages/Rec';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Main} />
      <Route path='/smp' component={Smp} />
      <Route path='/rec' component={Rec} />
      <Route path='/layout' component={Layout} />
    </Switch>
  </BrowserRouter>
  ,document.getElementById('body'));
//ReactDOM.render(<Layout />, document.getElementById('body'));
