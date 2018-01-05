import { combineReducers } from "redux";
import * as Actions from "./actions";

const initialState = {
  stocksArray: [],
  isFetching: false,
  error: null
};

export function stocks(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_SUCCESS:
      return {
        ...state,
        stocks: action.data,
        isFetching: false
      };
    case Actions.GET_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case Actions.GET_FAILURE:
      console.log("Error:", action.error);
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
}

export const stockApp = combineReducers({ stocks });
