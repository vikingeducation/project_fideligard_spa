import * as Actions from "./actions";

const initialState = {
  transactions: [],
  portfolio: [],
  balance: 100000,
  stockData: {}
};

const FideligardApp = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_STOCKS:
      return {
        ...state,
        stockData: action.data
      };
    case Actions.CREATE_TRANSACTION:
      return {
        ...state,
        transactions: [...this.state.transactions, action.data]
      };
    case Actions.UPDATE_BALANCE:
      return {
        ...state,
        balance: this.state.balance + action.data
      };
    default:
      return state;
  }
};

export default FideligardApp;
