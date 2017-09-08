import Portfolio from "./Portfolio";
import Stocks from "./Stocks";
import Transactions from "./Transactions";
import Trade from "./Trade";

export const resources = {
  portfolio: Portfolio,
  stocks: Stocks,
  transactions: Transactions,
  trade: Trade
};

export const Resource = ({ type }) => resources[type]();

export const resourceNames = Object.keys(resources);
