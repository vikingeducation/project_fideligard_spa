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

export const resourceNames = Object.keys(resources);
