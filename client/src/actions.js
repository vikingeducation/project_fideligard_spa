export const GET_STOCKS_SUCCESS = "GET_STOCKS_SUCCESS";
export const GET_STOCKS_REQUEST = "GET_STOCKS_REQUEST";
export const GET_STOCKS_FAILURE = "GET_STOCKS_FAILURE";
export const SET_SEARCH_TERM = "SET_SEARCH_TERM";
export const UPDATE_RESULTS = "UPDATE_RESULTS";
export const SELECT_STOCK = "SELECT_STOCK";
export const BUY_STOCK = "BUY_STOCK";
export const SELL_STOCK = "SELL_STOCK";
export const SELECT_QUANTITY = "SELECT_QUANTITY";

export const SET_DATE = "SET_DATE";

export function getStocksRequest() {
  return {
    type: GET_STOCKS_REQUEST
  };
}

export function getStocksFailure(error) {
  return {
    type: GET_STOCKS_FAILURE,
    error
  };
}

export function getStocksSuccess(data) {
  return {
    type: GET_STOCKS_SUCCESS,
    data
  };
}

export function getStocks(date) {
  return dispatch => {
    dispatch(getStocksRequest());

    fetch(`api/quandl/${date}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then(json => {
        dispatch(getStocksSuccess(json));
      })
      .catch(error => {
        dispatch(getStocksFailure(error));
      });
  };
}

export function getInitialStocks() {
  return dispatch => {
    dispatch(getStocks(20160129));
  };
}

export function setSearchTerm(data) {
  return {
    type: SET_SEARCH_TERM,
    data
  };
}
export function updateResults(data) {
  return {
    type: UPDATE_RESULTS,
    data
  };
}
export function setDate(data) {
  return {
    type: SET_DATE,
    data
  };
}
export function selectQuantity(data) {
  return {
    type: SELECT_QUANTITY,
    data
  };
}

export function selectStock(data) {
  return {
    type: SELECT_STOCK,
    data
  };
}
export function sellStock(data) {
  return {
    type: SELL_STOCK,
    data
  };
}
export function buyStock(data) {
  return {
    type: BUY_STOCK,
    data
  };
}
