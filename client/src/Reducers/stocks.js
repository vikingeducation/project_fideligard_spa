import {
  REQUEST_GET_STOCK,
  SUCCESS_GET_STOCK,
  FAILURE_GET_STOCK
} from "../actions/stocks";

const intialState = {
  stocks: [],
  isFetching: false,
  error: null
};
const stocks = (state = intialState, action) => {
  switch (action.type) {
    case REQUEST_GET_STOCK:
      return {
        ...state,
        isFetching: true
      };
    case SUCCESS_GET_STOCK:
      return {
        ...state,
        stocks: action.data,
        isFetching: false
      };
    case FAILURE_GET_STOCK:
      return {
        ...state,
        isFetching: false,
        error: action.data
      };
    default:
      return state;
  }
};
export default stocks;
