import { MODIFY_PORTFOLIO } from "../actions/portfolioAction";

export function portfolio(state = [], action) {
  switch (action.type) {
    case MODIFY_PORTFOLIO:
      return action.data;

    default:
      return state;
  }
}
