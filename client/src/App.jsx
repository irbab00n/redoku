import React from 'react';
import { createBrowserHistory } from "history";
import { Router, Switch, Route } from 'react-router-dom';

import Main from './views/Main.jsx';

import Navbar from './components/Navbar/index';

import '../sass/main.scss';

/* Make application history available as an export */
export const hist = createBrowserHistory();

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div id="application-wrapper">
        <Navbar />
        <Router history={hist}>
          <Switch>
            <Route exact path="/" component={Main}/>
          </Switch>
        </Router>
      </div>
    );
  }
};
