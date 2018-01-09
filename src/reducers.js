import { combineReducers } from "redux";
import * as Actions from "./actions";
import FBdata from "./data/FBclose.json";
import GOOGLEdata from "./data/GOOGLEclose.json";

const initialState = {
  stocks: [{ name: "FB", quantity: 100 }, { name: "GOOGL", quantity: 100 }],
  orderType: "BUY",
  balance: 1000,
  stocksArray: [FBdata.datatable.data, GOOGLEdata.datatable.data],
  date: "2018-01-04",
  isFetching: false,
  error: null,
  ticker: null
};

export function stocksReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_SUCCESS:
      console.log("Successful API call", action.data);
      return {
        ...state,
        stocksArray: action.data,
        isFetching: false
      };
    case Actions.GET_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case Actions.GET_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case Actions.SET_DATE:
      return {
        ...state,
        date: action.data
      };
    case Actions.CHANGE_QUANTITY:
      let changedQuantity = Number(action.data);
      return {
        ...state,
        stocks: {
          ...state.stocks,
          quantity: changedQuantity,
          cost: 10
        }
      };
    case Actions.CHANGE_ORDER_TYPE:
      return {
        ...state,
        orderType: action.data
      };
    default:
      return state;
  }
}

export const stockApp = combineReducers({ stocksReducer });
