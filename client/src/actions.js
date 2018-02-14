import { previousDate, apiDate } from "./helpers/helper";
export const CLEAR_DATA = "CLEAR_DATA";
//API CALLS
export const GET_STOCK_SUCCESS = "GET_STOCK_SUCCESS";
export const GET_REQUEST = "GET_REQUEST";
export const GET_REQUEST_FAILURE = "GET_REQUEST_FAILURE";
//INPUTS
export const SET_SEARCH = "SET_SEARCH";
export const SET_DATE = "SET_DATE";
//TRADE FORM
export const SET_TRADE_SYMBOL = "SET_TRADE_SYMBOL";
export const SET_TRADE_PRICE = "SET_TRADE_PRICE";
export const SET_TRADE_DATE = "SET_TRADE_DATE";
export const SET_TRADE_QUANTITY = "SET_TRADE_QUANTITY";
export const SET_TRADE_BUY = "SET_TRADE_BUY";
export const SET_CASH = "SET_CASH";
//TRANSACTIONS
export const SET_TRANSACTION = "SET_TRANSACTION";
export const CLEAR_TRANSACTION_TRADE = "CLEAR_TRANSACTION_TRADE";
//API CALLS
export function getRequest() {
  return {
    type: GET_REQUEST
  };
}

export function getStockSuccess(date, data) {
  return {
    type: GET_STOCK_SUCCESS,
    data: { date, data }
  };
}

export function getRequestFailure(error) {
  return {
    type: GET_REQUEST_FAILURE,
    error
  };
}

//INPUT
export function setSearch(data) {
  return {
    type: SET_SEARCH,
    data
  };
}

export function setDate(data) {
  return {
    type: SET_DATE,
    data
  };
}

//TRADE FORM
export function setTradeSymbol(data) {
  return {
    type: SET_TRADE_SYMBOL,
    data
  };
}

export function setTradePrice(data) {
  return {
    type: SET_TRADE_PRICE,
    data
  };
}

export function setTradeDate(data) {
  return {
    type: SET_TRADE_DATE,
    data
  };
}

export function setTradeQuantity(data) {
  return {
    type: SET_TRADE_QUANTITY,
    data
  };
}

export function setTradeBuy(data) {
  return {
    type: SET_TRADE_BUY,
    data
  };
}

export function setCashAmount(data) {
  return {
    type: SET_CASH,
    data
  };
}

export function setTransaction(data) {
  return {
    type: SET_TRANSACTION,
    data
  };
}

export function clearTransactionTrade() {
  return {
    type: CLEAR_TRANSACTION_TRADE
  };
}

const checkStatus = response => {
  if (!response.ok) {
    throw new Error("Error with api");
  }
  return response.json();
};

export function getApiData(date, stocks) {
  return dispatch => {
    dispatch(getRequest());
    if (!date || !stocks) {
      dispatch(() => {});
    } else if (stocks[date] !== undefined) {
      dispatch(() => {});
    } else {
      fetch(`WIKI/PRICES/${date}/`)
        .then(checkStatus)
        .then(json => {
          if (json.datatable.data.length < 1) {
            dispatch(getStockSuccess(date, null));
          } else {
            dispatch(getStockSuccess(date, json.datatable.data));
          }
        })
        .catch(() => {
          dispatch(() => {});
        });
    }
  };
}
