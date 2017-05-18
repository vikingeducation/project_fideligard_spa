import { CHANGE_DATE } from "../actions/dateAction";

export function date(state = "2017-05-01", action) {
  switch (action.type) {
    case CHANGE_DATE:
      return action.data;

    default:
      return state;
  }
}
