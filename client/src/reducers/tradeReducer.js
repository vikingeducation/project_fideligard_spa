import {
  SELECT_TRADE,
  CHANGE_QUANTITY,
  REMOVE_TRADE,
  CHANGE_TYPE
} from "../actions/tradeAction";

export function trade(state = {}, action) {
  switch (action.type) {
    case SELECT_TRADE:
      let type = state.type ? state.type : "buy";
      return { ...action.data, type, quantity: 1 } || state;
    case CHANGE_QUANTITY:
      return {
        ...state,
        quantity: action.data
      };
    case REMOVE_TRADE:
      return {};
    case CHANGE_TYPE:
      return {
        ...state,
        type: action.data
      };
    default:
      return state;
  }
}
