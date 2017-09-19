import { formatSidebarData } from "./helpers/parseStocks";

export const SET_STOCKS = "SET_STOCKS";
export const UPDATE_BALANCE = "UPDATE_BALANCE";
export const SET_DATE = "SET_DATE";
export const SET_SIDEBAR_DATA = "SET_SIDEBAR_DATA";
export const UPDATE_SIDEBAR = "UPDATE_SIDEBAR";
export const SET_SYMBOL = "SET_SYMBOL";
export const SET_THIS_DATE_PRICE = "SET_THIS_DATE_PRICE";
export const ADD_TRANSACTION = "ADD_TRANSACTION";

export const addTransaction = data => {
  return {
    type: ADD_TRANSACTION,
    data
  };
};

export const updateBalance = amount => {
  return {
    type: UPDATE_BALANCE,
    data: amount
  };
};

export const setStocks = stocks => {
  return {
    type: SET_STOCKS,
    data: stocks
  };
};

export const setDate = date => {
  return {
    type: SET_DATE,
    data: date
  };
};

export const setSymbol = symbol => {
  return {
    type: SET_SYMBOL,
    data: symbol
  };
};

export const setSidebarData = stocks => {
  return {
    type: SET_SIDEBAR_DATA,
    data: stocks
  };
};

export const setThisDatePrice = price => {
  return {
    type: SET_THIS_DATE_PRICE,
    data: price
  };
};
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "http://localhost:3001/api"
    : "http://localhost:3000/api";

export const getStocks = () => async dispatch => {
  const response = await fetch(`${BASE_URL}/prices`);
  const stocks = await response.json();
  dispatch(setStocks(stocks));
};

export const updateSidebar = (today, stocks, date) => {
  const sideBarData = formatSidebarData(today, stocks, date);
  return {
    type: UPDATE_SIDEBAR,
    data: sideBarData
  };
};

export const buyStock = (total, transactionInfo) => dispatch => {
  dispatch(updateBalance(-total));
  dispatch(addTransaction(transactionInfo));
};
