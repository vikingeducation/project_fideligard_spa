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
    order: 1,
    history: [{
      date: "2017-06-30",
      id: 1,
      price: 59.31,
      quantity: 1,
      symbol: "A",
      type: "BUY",
    }, {
      date: "2017-06-28",
      id: 2,
      price: 2,
      quantity: 1,
      symbol: "BCB",
      type: "BUY",
    }]
  }
}

const store = createStore(fideligard, preloadedState, applyMiddleware(thunk))


ReactDOM.render(
  <Provider store={store}>
  <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
