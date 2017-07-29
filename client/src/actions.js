export const SET_DATE = "SET_DATE";
export const SET_FILTER = "SET_FILTER";
export const RESET_FILTER = "RESET_FILTER";
export const ADD_STOCK_TO_LIST = "ADD_STOCK_TO_LIST";
export const GET_STOCKS_SUCCESS = "GET_STOCKS_SUCCESS";
export const GET_STOCKS_REQUEST = "GET_STOCKS_REQUEST";
export const GET_STOCKS_FAILURE = "GET_STOCKS_FAILURE";
export const GET_SPECIFIC_STOCK_SUCCESS = "GET_SPECIFIC_STOCK_SUCCESS";
export const GET_SPECIFIC_STOCK_REQUEST = "GET_SPECIFIC_STOCK_REQUEST";
export const GET_SPECIFIC_STOCK_FAILURE = "GET_SPECIFIC_STOCK_FAILURE";
export const SET_SORT_ASCENDING = "SET_SORT_ASCENDING";
export const SET_SORT_DESCENDING = "SET_SORT_DESCENDING";
export const ADD_TRANSACTION = "ADD_TRANSACTION";
export const UPDATE_BALANCE = "UPDATE_BALANCE";
export const UPDATE_PORTFOLIO = "UPDATE_PORTFOLIO";

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

export function getSpecificStockRequest() {
  return {
    type: GET_SPECIFIC_STOCK_REQUEST
  };
}

export function getSpecificStockSuccess(data) {
  return {
    type: GET_SPECIFIC_STOCK_SUCCESS,
    data
  };
}

export function getSpecificStockFailure(error) {
  return {
    type: GET_SPECIFIC_STOCK_FAILURE,
    error
  };
}

export function setDate(data) {
  return {
    type: SET_DATE,
    data
  };
}

export function setFilter(data = "") {
  return {
    type: SET_FILTER,
    data: data.toUpperCase()
  };
}

export function resetFilter(data) {
  return {
    type: RESET_FILTER
  };
}

export function addStockToList(data) {
  return {
    type: ADD_STOCK_TO_LIST,
    data
  };
}

export function setSortAscending() {
  return {
    type: SET_SORT_ASCENDING
  };
}

export function setSortDescending() {
  return {
    type: SET_SORT_DESCENDING
  };
}

export function addTransaction(data) {
  return {
    type: ADD_TRANSACTION,
    data
  };
}

export function updateBalance(data) {
  return {
    type: UPDATE_BALANCE,
    data
  };
}

export function updatePortfolio(data) {
  return {
    type: UPDATE_PORTFOLIO,
    data
  };
}

// @param {array} stocks
export function getStocks(stocks, date) {
  return dispatch => {
    dispatch(getStocksRequest());

    fetch(`api/stocks?symbols=${stocks.toString()}&date=${date}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }

        return response.json();
      })
      .then(json => {
        dispatch(getStocksSuccess(json.data));
      })
      .catch(error => {
        dispatch(getStocksFailure(error));
      });
  };
}

export function getSpecificStock(stock, date) {
  return dispatch => {
    dispatch(getSpecificStockRequest());

    fetch(`api/stocks?symbols=${stock.toString()}&date=${date}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }

        return response.json();
      })
      .then(json => {
        dispatch(getSpecificStockSuccess(json.data[stock]));
      })
      .catch(error => {
        dispatch(getSpecificStockFailure(error));
      });
  };
}
