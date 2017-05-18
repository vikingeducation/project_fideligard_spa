import { CHANGE_DATE } from "../actions/dateAction";
import moment from 'moment';

let initialDate = moment().subtract(1, 'day').format("YYYY-MM-DD");


export function date(state = initialDate, action) {
  switch (action.type) {
    case CHANGE_DATE:
      return action.data;

    default:
      return state;
  }
}
