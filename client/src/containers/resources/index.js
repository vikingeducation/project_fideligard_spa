import PortfolioContainer from "./PortfolioContainer";
import StocksContainer from "./StocksContainer";
import TransactionsContainer from "./TransactionsContainer";
import TradeContainer from "./TradeContainer";

export const resources = {
  portfolio: PortfolioContainer,
  stocks: StocksContainer,
  transactions: TransactionsContainer,
  trade: TradeContainer
};

export const ResourceContainer = ({ type }) => resources[type]();

export const resourceNames = ["portfolio", "transactions", "trade"];
