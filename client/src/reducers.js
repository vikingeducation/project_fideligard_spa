import * as Actions from "./actions";

const initialState = {
  stocks: [],
  money: 10000,
  transactions: [],
  selectedDate: new Date(),
  selectedStock: {},
  quantity: 0,
  results: [],
  filteredResults: [],
  searchTerm: "",
  isFetching: false,
  error: null
};

export function stocksApp(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_STOCKS_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case Actions.GET_STOCKS_SUCCESS:
      return {
        ...state,
        filteredResults: action.data,
        results: action.data,
        isFetching: false
      };
    case Actions.GET_STOCKS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case Actions.SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.data
      };
    case Actions.UPDATE_RESULTS:
      return {
        ...state,
        filteredResults: action.data
      };
    case Actions.SELECT_STOCK:
      return {
        ...state,
        selectedStock: action.data
      };
    case Actions.SET_DATE:
      return {
        ...state,
        selectedDate: action.data
      };
    case Actions.SELECT_QUANTITY:
      return {
        ...state,
        quantity: action.data
      };
    default:
      return {
        ...state
      };
  }
}
