import * as Actions from "./actions";
import { combineReducers } from "redux";

const initialState = {
  date: "1999-11-18",
  stockFilter: "",
  stockWatchlist: ["KO", "PG", "UNH", "AAPL", "DIS", "GS", "MRK", "TRV", "UTX", "VZ", "WM"],
  stockData: {
    stocks: {},
    isFetching: false,
    error: null
  }
}

const date = (state = initialState.date, action) => {
  switch(action.type) {
    case Actions.SET_DATE: 
      return action.data
    default:
      return state;
  }
}

const stockFilter = (state = initialState.stockFilter, action) => {
  switch(action.type) {
    case Actions.SET_FILTER: 
      return action.data
    case Actions.RESET_FILTER:
      return "";
    default:
      return state;
  }
}

const stockWatchlist = (state = initialState.stockWatchlist, action) => {
  switch(action.type) {
    case Actions.ADD_STOCK_TO_LIST:
      return [
        ...state,
        action.data
      ];
    default:
      return state;
  }
}

const stockData = (state = initialState.stockData, action) => {
  switch (action.type) {
    case Actions.GET_STOCKS_SUCCESS:
      return {
        ...state,
        stocks: action.data,
        isFetching: false
      };
    case Actions.GET_STOCKS_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case Actions.GET_STOCKS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
}

export const stockApp = combineReducers({
  date,
  stockFilter,
  stockWatchlist,
  stockData
});
