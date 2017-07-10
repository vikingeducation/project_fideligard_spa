export const SET_DATE = "SET_DATE";
export const SET_FILTER = "SET_FILTER";
export const RESET_FILTER = "RESET_FILTER";
export const ADD_STOCK_TO_LIST = "ADD_STOCK_TO_LIST";
export const GET_STOCKS_SUCCESS = "GET_STOCKS_SUCCESS";
export const GET_STOCKS_REQUEST = "GET_STOCKS_REQUEST";
export const GET_STOCKS_FAILURE = "GET_STOCKS_FAILURE";

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

// @param {array} stocks
export function getInitialStocks(stocks, date) {
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