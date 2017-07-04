import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import registerServiceWorker from './registerServiceWorker';
import { getDaysAgo } from './helpers/dates'
import fideligard from './reducers/fideligard'
import { stock } from './data/stocks'
import { transactions } from './data/transactions'

const yesterday = getDaysAgo(new Date(), 1)

const preloadedState = {
  dates: {
    current: yesterday,
    max: yesterday,
    min: '1999-01-01'
  },
  stocks: {
    prices: stock,
    order: 1,
    symbols: Object.keys(stock),
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
