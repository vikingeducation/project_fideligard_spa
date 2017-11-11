import * as Actions from "./actions";

const initalState = {
  todayStocks: {},
  yesterStocks: {},
  weekStocks: {},
  monthStocks: {},
  isFetching: false,
  error: null
};

export function fideligard(state = initalState, action) {
  console.log(action);
  switch (action.type) {
    case Actions.GET_TODAY_SUCCESS:
      return {
        ...state,
        todayStocks: action.data,
        isFetching: false,
        error: null
      };
    case Actions.GET_YESTER_SUCCESS:
      return {
        ...state,
        yesterStocks: action.data,
        isFetching: false,
        error: null
      };
    case Actions.GET_WEEK_SUCCESS:
      return {
        ...state,
        weekStocks: action.data,
        isFetching: false,
        error: null
      };
    case Actions.GET_MONTH_SUCCESS:
      return {
        ...state,
        monthStocks: action.data,
        isFetching: false,
        error: null
      };
    case Actions.GET_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case Actions.GET_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };

    default:
      return state;
  }
}
