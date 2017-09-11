import * as Actions from "./actions";

const initialState = {
  date: "2015-02-14",
  transactions: [],
  portfolio: [],
  balance: 100000,
  stockData: {},
  sideBarData: {},
  thisDateStocks: {},
  thisDatePrice: null,
  symbol: "AAPL"
};

const FideligardApp = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_STOCKS:
      return {
        ...state,
        stockData: action.data,
        thisDateStocks: action.data[state.date],
        thisDatePrice: action.data[state.date][state.symbol]
      };
    case Actions.UPDATE_SIDEBAR:
      return {
        ...state,
        sideBarData: action.data
      };
    case Actions.SET_DATE:
      return {
        ...state,
        date: action.data
      };
    case Actions.SET_SYMBOL:
      return {
        ...state,
        symbol: action.data
      };
    case Actions.SET_THIS_DATE_PRICE:
      return {
        ...state,
        thisDatePrice: action.data
      };
    case Actions.ADD_TRANSACTION:
      return {
        ...state,
        transactions: [...state.transactions, action.data]
      };
    case Actions.UPDATE_BALANCE:
      return {
        ...state,
        balance: state.balance + action.data
      };
    default:
      return state;
  }
};

export default FideligardApp;
