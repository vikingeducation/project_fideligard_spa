import * as Actions from "./actions";

const initialState = {
  stocks: [],
  money: 10000,
  transactions: [],
  selectedDate: 20160129,
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
    case Actions.BUY_STOCK:
      return {
        ...state,
        money: state.money -
          action.data.quantity * action.data.stock.currentPrice,
        stocks: stockListUpdate(state, action.data),
        transactions: [
          ...state.transactions,
          {
            date: state.selectedDate,
            quantity: action.data.quantity,
            stock: action.data.stock,
            type: "buy"
          }
        ],
        selectedStock: {},
        quantity: 0
      };
    case Actions.SELL_STOCK:
      return {
        ...state,
        money: state.money +
          action.data.quantity * action.data.stock.currentPrice,
        stocks: stockSellUpdate(state, action.data),
        transactions: [
          ...state.transactions,
          {
            date: state.selectedDate,
            quantity: action.data.quantity,
            stock: action.data.stock,
            type: "sell"
          }
        ],
        selectedStock: {},
        quantity: 0
      };
    default:
      return {
        ...state
      };
  }
}

function stockSellUpdate(state, data) {
  let newStocks = state.stocks.map(stock => {
    if (stock.ticker === data.stock.ticker) {
      stock.quantity -= data.stock.quantity;
    }
    return stock;
  });
  return newStocks;
}

function stockListUpdate(state, data) {
  let found = false;
  let newStocks;
  state.stocks.forEach(stock => {
    if (stock.ticker === data.stock.ticker) {
      found = true;
    }
  });

  if (found) {
    newStocks = state.stocks.map(stock => {
      if (stock.ticker === data.stock.ticker) {
        stock.quantity += data.quantity;
      }
      return stock;
    });
  } else {
    newStocks = [
      ...state.stocks,
      {
        ticker: data.stock.ticker,
        quantity: data.quantity
      }
    ];
  }
  return newStocks;
}
