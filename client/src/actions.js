import { checkStatus } from './helpers';
import moment from 'moment';

export const SET_SLIDER = "SET_SLIDER";
export const GET_STOCKS_REQUEST = 'GET_STOCKS_REQUEST';
export const GET_STOCKS_SUCCESS = 'GET_STOCKS_SUCCESS';
export const GET_STOCKS_FAILURE = 'GET_STOCKS_FAILURE';
export const SORT_STOCKS = 'SORT_STOCKS';
export const GET_TRADE_INFO_REQUEST = 'GET_TRADE_INFO_REQUEST';
export const GET_TRADE_INFO_SUCCESS = 'GET_TRADE_INFO_SUCCESS';
export const GET_TRADE_INFO_FAILURE = 'GET_TRADE_INFO_FAILURE';
export const GET_TRADE_INFO = 'GET_TRADE_INFO';
export const SET_TRANSACTION_TYPE = 'SET_TRANSACTION_TYPE';
export const UPDATE_TRANSACTION = 'UPDATE_TRANSACTION';
export const RESET_FORM = 'RESET_FORM';
export const POST_TRANSACTION_REQUEST = 'POST_TRANSACTION_REQUEST';
export const POST_TRANSACTION_SUCCESS = 'POST_TRANSACTION_SUCCESS';
export const POST_TRANSACTION_FAILURE = 'POST_TRANSACTION_FAILURE';
export const CREATE_TRANSACTION = 'CREATE_TRANSACTION';

export function setSlider(data) {
  return {
    type: SET_SLIDER,
    data
  };
}

export function getStocksRequest() {
  return {
    type: GET_STOCKS_REQUEST
  };
}

export function getStocksSuccess(data) {
  return {
    type: GET_STOCKS_SUCCESS,
    data
  };
}

export function getStocksFailure(error) {
  return {
    type: GET_STOCKS_FAILURE,
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
    type: SORT_STOCKS,
    column
  };
}

export function getTradeInfoRequest() {
  return {
    type: GET_TRADE_INFO_REQUEST
  };
}

export function getTradeInfoSuccess(data) {
  return {
    type: GET_TRADE_INFO_SUCCESS,
    data
  };
}

export function getTradeInfoFailure(error) {
  return {
    type: GET_TRADE_INFO_FAILURE,
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
    type: SET_TRANSACTION_TYPE,
    value
  };
}

export function updateTransaction(data) {
  return {
    type: UPDATE_TRANSACTION,
    data
  };
}

export function resetForm() {
  return {
    type: RESET_FORM
  };
}

export function postTransactionRequest() {
  return {
    type: POST_TRANSACTION_REQUEST
  };
}

export function postTransactionSuccess(data) {
  return {
    type: POST_TRANSACTION_SUCCESS,
    data
  };
}

export function postTransactionFailure(error) {
  return {
    type: POST_TRANSACTION_FAILURE,
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
