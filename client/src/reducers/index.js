import { stocks } from "./stocksReducer";
import { date } from "./dateReducer";
import { trade } from "./tradeReducer";
import { cash } from "./cashReducer";
import { transactions } from "./transactionsReducer";
import { portfolio } from "./portfolioReducer";
import { combineReducers } from "redux";

export const stockAppReducer = combineReducers({
  date,
  stocks,
  trade,
  cash,
  transactions,
  portfolio
});
