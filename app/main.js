import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'

import App from './containers/App'

import config from 'json!yaml!../config.yml'
import am from 'dsv!../am.csv'
import pm from 'dsv!../pm.csv'

console.log('config', config)
window.MM_CONFIG = config
window.APC_AM = am
window.APC_PM = pm

import * as reducers from './reducers'

const store = createStore(
  combineReducers({
    ...reducers
  }),
  applyMiddleware(thunkMiddleware)
)

console.log('initial store', store.getState())

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
let unsubscribe = store.subscribe(() =>
  console.log('store updated', store.getState())
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('main'))
