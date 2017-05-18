import { CHANGE_DATE } from "../actions/dateAction";

export function date(state = "", action) {
  switch (action.type) {
    case CHANGE_DATE:
      return action.data;

    default:
      return state;
  }
}
