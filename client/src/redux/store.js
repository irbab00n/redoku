import { applyMiddleware, compose, createStore } from 'redux';
/* --- Redux middleware */
import thunk from 'redux-thunk';
/* --- Redux files */
import reducers from './reducers';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancer(applyMiddleware(
    thunk,
  ))
);

export default store;