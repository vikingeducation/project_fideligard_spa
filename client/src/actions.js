import { previousDate } from "./helpers/helper";
export const CLEAR_DATA = "CLEAR_DATA";
//API CALLS
export const GET_TODAY_SUCCESS = "GET_TODAY_SUCCESS";
export const GET_YESTER_SUCCESS = "GET_YESTER_SUCCESS";
export const GET_WEEK_SUCCESS = "GET_WEEK_SUCCESS";
export const GET_MONTH_SUCCESS = "GET_MONTH_SUCCESS";
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

export function getTodaySuccess(data) {
  return {
    type: GET_TODAY_SUCCESS,
    data
  };
}

export function getYesterSuccess(data) {
  return {
    type: GET_YESTER_SUCCESS,
    data
  };
}

export function getWeekAgoSuccess(data) {
  return {
    type: GET_WEEK_SUCCESS,
    data
  };
}

export function getMonthAgoSuccess(data) {
  return {
    type: GET_MONTH_SUCCESS,
    data
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

export function getApiData(section, params, date, successCB) {
  return dispatch => {
    dispatch(getRequest());
    if (!section || !params || !date) {
      return {};
    }
    fetch(`${section}/${params}/${date}/`)
      .then(checkStatus)
      .then(json => {
        if (json.datatable.data.length < 1) {
          dispatch(
            getApiData(section, params, previousDate(date, 1), successCB)
          );
        } else {
          dispatch(successCB(json.datatable));
        }
      })
      .catch(error => {
        dispatch(getApiData(section, params, previousDate(date, 1), successCB));
      });
  };
}
