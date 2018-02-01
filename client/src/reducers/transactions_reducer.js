import * as Actions from '../actionTypes';

const initialState = {
  transactions: [],
  isFetching: false,
  error: null,
  sortBy: {
    column: 'date',
    direction: 'NONE'
  }
};

const transactionsInfo = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_TRANSACTIONS_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case Actions.GET_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        transactions: action.data
      };
    case Actions.GET_TRANSACTIONS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case Actions.SORT_TRANSACTIONS:
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
          column: 'date',
          direction: 'NONE'
        }
      };
    default:
      return state;
  }
};

export default transactionsInfo;
