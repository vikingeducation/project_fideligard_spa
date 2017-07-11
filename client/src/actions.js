export const SET_DATE = "SET_DATE";
export const SET_FILTER = "SET_FILTER";
export const RESET_FILTER = "RESET_FILTER";
export const ADD_STOCK_TO_LIST = "ADD_STOCK_TO_LIST";
export const GET_STOCKS_SUCCESS = "GET_STOCKS_SUCCESS";
export const GET_STOCKS_REQUEST = "GET_STOCKS_REQUEST";
export const GET_STOCKS_FAILURE = "GET_STOCKS_FAILURE";
export const SET_SORT_ASCENDING = "SET_SORT_ASCENDING";
export const SET_SORT_DESCENDING = "SET_SORT_DESCENDING";

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

export function setDate(data) {
  return {
    type: SET_DATE,
    data
  }
}

export function setFilter(data = "") {
  return {
    type: SET_FILTER,
    data
  }
}

export function resetFilter(data) {
  return {
    type: RESET_FILTER
  }
}

export function addStockToList(data) {
  return {
    type: ADD_STOCK_TO_LIST,
    data
  }
}

export function setSortAscending() {
  return {
    type: SET_SORT_ASCENDING
  }
}

export function setSortDescending() {
  return {
    type: SET_SORT_DESCENDING
  }
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