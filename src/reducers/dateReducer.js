import { changeDate, CHANGE_DATE } from "../actions/dateAction";

export function date(state = 0, action) {
  switch (action.type) {
    case CHANGE_DATE:
      return action.data;

    default:
      return state;
  }
}
