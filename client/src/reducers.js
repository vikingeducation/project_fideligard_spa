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
  transactions: [],
  trade: { symbol: "", price: [0], date: [0], quantity: 0, buy: "BUY" },
  cash: 10000,
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
    case Actions.SET_TRADE_SYMBOL:
      return {
        ...state,
        trade: { ...state.trade, symbol: action.data }
      };
    case Actions.SET_TRADE_PRICE:
      return {
        ...state,
        trade: { ...state.trade, price: action.data }
      };
    case Actions.SET_TRADE_DATE:
      return {
        ...state,
        trade: { ...state.trade, date: action.data }
      };
    case Actions.SET_TRADE_QUANTITY:
      return {
        ...state,
        trade: { ...state.trade, quantity: action.data }
      };
    case Actions.SET_TRADE_BUY:
      return {
        ...state,
        trade: { ...state.trade, buy: action.data }
      };
    case Actions.SET_CASH:
      return {
        ...state,
        cash: action.data
      };
    case Actions.SET_TRANSACTION:
      return {
        ...state,
        transactions: [...state.transactions, action.data]
      };
    case Actions.CLEAR_TRANSACTION_TRADE:
      return {
        ...state,
        transactions: [],
        trade: { symbol: "", price: [0], date: [0], quantity: 0, buy: "BUY" },
        cash: 10000
      };
    default:
      return state;
  }
}
