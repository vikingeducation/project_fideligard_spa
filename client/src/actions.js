import { checkStatus } from './helpers';
import moment from 'moment';
import * as Actions from './actionTypes';

export function setSlider(data) {
  return {
    type: Actions.SET_SLIDER,
    data
  };
}

export function getStocksRequest() {
  return {
    type: Actions.GET_STOCKS_REQUEST
  };
}

export function getStocksSuccess(data) {
  return {
    type: Actions.GET_STOCKS_SUCCESS,
    data
  };
}

export function getStocksFailure(error) {
  return {
    type: Actions.GET_STOCKS_FAILURE,
    error
  };
}

export function getStocks(date) {
  return (dispatch) => {
    dispatch(getStocksRequest());

    const formattedDate = moment(date, "MM-DD-YYYY").format('YYYY-MM-DD');

    fetch(`/api/v1/stocks?date=${ formattedDate }`)
      .then(checkStatus)
      .then(stocks => {
        if (stocks.status !== 200) throw stocks;
        dispatch(getStocksSuccess(stocks));
      })
      .catch(error => {
        dispatch(getStocksFailure(error));
      });
  };
}

export function sortStocks(column) {
  return {
    type: Actions.SORT_STOCKS,
    column
  };
}

export function getTradeInfoRequest() {
  return {
    type: Actions.GET_TRADE_INFO_REQUEST
  };
}

export function getTradeInfoSuccess(data) {
  return {
    type: Actions.GET_TRADE_INFO_SUCCESS,
    data
  };
}

export function getTradeInfoFailure(error) {
  return {
    type: Actions.GET_TRADE_INFO_FAILURE,
    error
  };
}

export function getTradeInfo(ticker) {
  return (dispatch) => {
    dispatch(getTradeInfoRequest());

    fetch(`/api/v1/stocks/${ ticker }`)
      .then(checkStatus)
      .then(tradeData => {
        if (tradeData.status !== 200) throw tradeData;
        dispatch(getTradeInfoSuccess(tradeData));
      })
      .catch(error => {
        dispatch(getTradeInfoFailure(error));
      });
  };
}

export function setTransactionType(value) {
  return {
    type: Actions.SET_TRANSACTION_TYPE,
    value
  };
}

export function updateTransaction(data) {
  return {
    type: Actions.UPDATE_TRANSACTION,
    data
  };
}

export function resetForm() {
  return {
    type: Actions.RESET_FORM
  };
}

export function postTransactionRequest() {
  return {
    type: Actions.POST_TRANSACTION_REQUEST
  };
}

export function postTransactionSuccess(data) {
  return {
    type: Actions.POST_TRANSACTION_SUCCESS,
    data
  };
}

export function postTransactionFailure(error) {
  return {
    type: Actions.POST_TRANSACTION_FAILURE,
    error
  };
}

export function createTransaction(body) {
  return (dispatch) => {
    dispatch(postTransactionRequest());

    fetch(`/api/v1/transactions`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body
    })
      .then(checkStatus)
      .then(response => {
        if (response.status !== 200) throw response;
        dispatch(postTransactionSuccess(response));
      })
      .catch(error => {
        dispatch(postTransactionFailure(error));
      });
  };
}

export function getTransactionsRequest() {
  return {
    type: Actions.GET_TRANSACTIONS_REQUEST
  };
}

export function getTransactionsSuccess(data) {
  return {
    type: Actions.GET_TRANSACTIONS_SUCCESS,
    data
  };
}

export function getTransactionsFailure(error) {
  return {
    type: Actions.GET_TRANSACTIONS_FAILURE,
    error
  };
}

export function getTransactions() {
  return (dispatch) => {
    dispatch(getTransactionsRequest());

    fetch('api/v1/transactions')
      .then(checkStatus)
      .then(transactions => {
        dispatch(getTransactionsSuccess(transactions));
      })
      .catch(error => {
        dispatch(getTransactionsFailure(error));
      });
  };
}

export function sortTransactions(column) {
  return {
    type: Actions.SORT_TRANSACTIONS,
    column
  };
}
