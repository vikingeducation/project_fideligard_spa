import * as Actions from '../actionTypes';

const initialState = {
  investments: [],
  transactions: [],
  isFetching: false,
  error: null,
  sortBy: {
    column: 'code',
    direction: 'NONE'
  }
};

const portfolio = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_PORTFOLIO_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case Actions.GET_PORTFOLIO_SUCCESS:
      return {
        ...state,
        investments: action.data.investments,
        transactions: action.data.transactions,
        cash: action.data.user.cash,
        isFetching: false,
        error: null
      };
    case Actions.GET_PORTFOLIO_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case Actions.SORT_PORTFOLIO:
      return {
        ...state,
        sortBy: {
          column: action.column,
          direction: state.sortBy.direction === 'DESC' ? 'ASC' : 'DESC'
        }
      };
    case Actions.RESET:
      return {
        ...state,
        isFetching: false,
        error: null,
        sortBy: {
          column: 'code',
          direction: 'NONE'
        }
      };
    default:
      return state;
  }
};

export default portfolio;
