import * as Actions from '../actions';

const initialState = {
  stocks: [],
  isFetching: false,
  error: null,
  sortBy: {
    column: 'code',
    direction: 'NONE'
  }
};

const stockInfo = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_STOCKS_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case Actions.GET_STOCKS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        stocks: action.data.stockData
      };
    case Actions.GET_STOCKS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case Actions.SORT_STOCKS:
      return {
        ...state,
        sortBy: {
          column: action.column,
          direction: state.sortBy.direction === 'DESC' ? 'ASC' : 'DESC'
        }
      };
    default:
      return state;
  }
};

export default stockInfo;
