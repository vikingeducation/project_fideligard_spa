import { stocks } from "./stocksReducer";
import { date } from "./dateReducer";
import { trade } from "./tradeReducer";
import { combineReducers } from "redux";

export const stockAppReducer = combineReducers({ date, stocks, trade });
