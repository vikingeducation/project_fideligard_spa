import * as Actions from "./actions";

const initalState = {
  todayStocks: {},
  todaysDate: new Date(),
  yesterStocks: {},
  weekStocks: {},
  monthStocks: {},
  isFetching: false,
  error: null,
  searchBox: "",
  portfolio: {},
  transactions: {},
  dropdownPaths: [
    { url: "/", label: "Portfolio" },
    { url: "/trade", label: "Trade" },
    { url: "/transactions", label: "Transactions" }
  ]
};

export function fideligard(state = initalState, action) {
  console.log(action, state);
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
    case Actions.SET_SEARCH:
      return {
        ...state,
        searchBox: action.data
      };
    case Actions.SET_DATE:
      return {
        ...state,
        todaysDate: new Date(action.data)
      };
    default:
      return state;
  }
}
