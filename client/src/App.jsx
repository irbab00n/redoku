import React from 'react';
import { createBrowserHistory } from "history";
import { Router, Switch, Route } from 'react-router-dom';

/* VIEWS */
import Main from './views/Main.jsx';

/* COMPONENTS */
import Navbar from './components/Navbar/index';

/* LIBRARY FILES */
import links from './lib/testNavLinks';

/* Import CSS classes */
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
        <Navbar
          logoURL={'https://s3-us-west-1.amazonaws.com/cos-bytes.com/redoku/redoku-favicon.png'}
          title={'edoku'}
        />
        <Router history={hist}>
          <Switch>
            <Route exact path="/" component={Main}/>
          </Switch>
        </Router>
      </div>
    );
  }
};
