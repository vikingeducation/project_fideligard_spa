import * as Actions from "./actions";

const initialState = {
  date: "2015-02-14",
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
    case Actions.SET_DATE:
      return {
        ...state,
        date: action.data
      };
    case Actions.CREATE_TRANSACTION:
      return {
        ...state,
        transactions: [...state.transactions, action.data]
      };
    case Actions.UPDATE_BALANCE:
      return {
        ...state,
        balance: state.balance + Number(action.data)
      };
    case Actions.UPDATE_PORTFOLIO:
      const symbol = action.data.symbol;
      if (state.portfolio[action.data.symbol]) {
        return {
          ...state,
          portfolio: state.portfolio.map(entry => {
            if (entry.symbol === symbol) {
              entry.quantity += action.data.quantity;
              entry.price += action.data.price;
            }

            return entry;
          })
        };
      } else {
        return {
          ...state,
          portfolio: [
            ...state.portfolio,
            {
              symbol: symbol,
              price: action.data.price,
              quantity: action.data.quantity
            }
          ]
        };
      }
    default:
      return state;
  }
};

export default FideligardApp;
