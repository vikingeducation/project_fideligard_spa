import { CHANGE_CASH } from "../actions/cashAction";

export function cash(state = 1000, action) {
  switch (action.type) {
    case CHANGE_CASH:
      return state - +action.data;

    default:
      return state;
  }
}
