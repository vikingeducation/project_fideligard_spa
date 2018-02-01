import * as Actions from '../actionTypes';

const initialState = {
  transactionType: 'BUY',
  transactionQuantity: 0,
  total: 0,
  isFetching: false,
  error: null,
  success: null
};

const trade = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_TRADE_INFO_REQUEST:
    case Actions.POST_TRANSACTION_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case Actions.GET_TRADE_INFO_SUCCESS:
      return {
        ...state,
        ...action.data.tradeData,
        isFetching: false
      };
    case Actions.GET_TRADE_INFO_FAILURE:
    case Actions.POST_TRANSACTION_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
        success: null
      };
    case Actions.SET_TRANSACTION_TYPE:
      return {
        ...state,
        transactionType: action.value,
        success: null,
        error: null
      };
    case Actions.UPDATE_TRANSACTION:
      return {
        ...state,
        transactionQuantity: action.data.quantity,
        total: action.data.total,
        success: null,
        error: null
      };
    case Actions.POST_TRANSACTION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        success: action.data.message,
        cashAvailable: action.data.cashAvailable,
        quantityOwned: action.data.quantityOwned,
        transactionType: 'BUY',
        transactionQuantity: 0,
        total: 0
      };
    case Actions.RESET:
      return {
        ...state,
        transactionType: 'BUY',
        transactionQuantity: 0,
        total: 0,
        error: null,
        success: null
      };
    default:
      return state;
  }
};

export default trade;
