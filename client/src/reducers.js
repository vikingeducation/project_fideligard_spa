import * as Actions from './actions';

const initialState = {
  stocks: [],
  money: 10000,
  transactions: [],
  selectedDate: new Date(),
  results: [],
  filteredResults: [],
  searchTerm: '',
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
    default:
      return {
        ...state
      };
  }
}
