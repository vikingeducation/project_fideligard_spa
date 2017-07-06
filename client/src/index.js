import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import registerServiceWorker from './registerServiceWorker';
import { dateToString } from './helpers/helpers'
import fideligard from './reducers/fideligard'
import { transactions } from './data/transactions'

const today = dateToString(new Date())

const preloadedState = {
  dates: {
    current: today,
    max: today,
    min: '1999-01-01'
  },
  stocks: {
    order: 1,
    dateKeys: ['d1', 'd7', 'd30']
  },
  trade: {
    quantity: 0
  },
  account: {
    balance: 1000
  },
  transactions: {
    sortBy: 'Date',
    order: -1,
    history: transactions
  },
  portfolio: {
    order: 1,
    investments: {}
  }
}

const store = createStore(fideligard, preloadedState, applyMiddleware(thunk))


ReactDOM.render(
  <Provider store={store}>
  <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
