import { SELECT_TRADE, CHANGE_QUANTITY } from "../actions/tradeAction";

export function trade(state = {}, action) {
  switch (action.type) {
    case SELECT_TRADE:
      return { ...action.data, quantity: 1 } || state;
    case CHANGE_QUANTITY:
      return {
        ...state,
        quantity: action.data
      };
    default:
      return state;
  }
}
