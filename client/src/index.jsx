/* React imports */
import React from 'react';
import ReactDOM from 'react-dom';

/* Redux imports */
import { applyMiddleware, createStore, compose } from 'redux';
import { Provider, connect } from 'react-redux';
/* --- Redux middleware */
import thunk from 'redux-thunk';
/* --- Redux files */
import reducers from './redux/reducers';
/** dispatchMappedActions info --
 * Rather than create the 'mapDispatchToProps' variable on every single component you connect to Redux
 * Move this into it's own module and import to any module you wish to connect to Redux
 */
import dispatchMappedActions from './redux/dispatchMappedActions';

/* Components */
import App from './App.jsx';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancer(applyMiddleware(
    thunk,
  ))
);

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