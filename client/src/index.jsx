/* React imports */
import React from 'react';
import ReactDOM from 'react-dom';

/* Redux imports */
import { Provider, connect } from 'react-redux';
import store from './redux/store';
import dispatchMappedActions from './redux/dispatchMappedActions';

/* Components */
import App from './App.jsx';

const ConnectedApp = connect(
  state => state,
  dispatchMappedActions
)(App);

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedApp />
      </Provider>
    );
  }
}

ReactDOM.render(
  <Root />,
  document.getElementById('app')
);