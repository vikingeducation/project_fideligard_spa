//import actions
export const CREATE_TRANSACTION = "CREATE TRANSACTION";
export const FAILED_TO_BUY = "FAILED TO BUY STOCK";
export const BUY_STOCK = "BUY STOCK";

const initState = {
  cash: 1000,
  transactions: [],
  stocks: [],
  error: null
};

const user = (state = initState, action) => {
  switch (action.type) {
    case CREATE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.concat(action.data)
      };
    case FAILED_TO_BUY:
      return {
        ...state,
        error: action.data.error
      };
    case BUY_STOCK:
      //check cash
      let cost = action.data.cost;
      if (state.cash >= cost) {
        //not enough cash
        return {
          ...state,
          error: FAILED_TO_BUY
        };
      }
      //process the purchase
      return {
        ...state,
        cash: state.cash - cost
      };
    default:
      return state;
  }
};
export default user;
