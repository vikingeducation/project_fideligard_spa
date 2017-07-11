import { connect } from "react-redux";
import Trades from "../components/Trades";
import serialize from "form-serialize";
import {
  getStocks,
  getSpecificStock,
  addStockToList,
  addTransaction,
  updateBalance,
  updatePortfolio
} from "../actions";
import { withRouter } from "react-router-dom";
import { processPortfolioBuy, processPortfolioSell } from "../helpers";

const mapStateToProps = (state, ownProps) => {
  return {
    stock: state.specificStockData.stock,
    isFetching: state.specificStockData.isFetching,
    date: state.date,
    balance: state.balance,
    portfolio: state.portfolio,
    stockWatchlist: state.stockWatchlist
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChangeStock: (e, date, stockWatchlist) => {
      e.preventDefault();
      const form = e.target;
      const stock = serialize(form, { hash: true }).symbol;
      dispatch(getSpecificStock(stock, date));
      if (!stockWatchlist.includes(stock)) {
        dispatch(addStockToList(stock));
        dispatch(getStocks([...stockWatchlist, stock], date));
      }
    },
    onSubmit: (e, balance, portfolio) => {
      const form = e.target;
      const transaction = serialize(form, { hash: true });
      const doesUserHaveEnoughCash = +transaction.total > +balance;
      const doesUserHaveEnoughStock =
        +transaction.quantity <= +portfolio[transaction.symbol];
      const isStockInPortfolio = portfolio.hasOwnProperty(transaction.symbol);

      if (transaction.type === "buy") {
        if (doesUserHaveEnoughCash) {
          ownProps.history.push("/failure");
        } else {
          let newPortfolio = processPortfolioBuy(transaction, portfolio);
          dispatch(addTransaction(transaction));
          dispatch(updateBalance(-transaction.total));
          dispatch(updatePortfolio(newPortfolio));
          ownProps.history.push("/success");
        }
      } else if (transaction.type === "sell") {
        if (!doesUserHaveEnoughStock || !isStockInPortfolio) {
          ownProps.history.push("/failure");
        } else {
          let newPortfolio = processPortfolioSell(transaction, portfolio);
          dispatch(addTransaction(transaction));
          dispatch(updateBalance(+transaction.total));
          dispatch(updatePortfolio(newPortfolio));
          ownProps.history.push("/success");
        }
      }
    }
  };
};

const TradesContainer = connect(mapStateToProps, mapDispatchToProps)(Trades);

export default withRouter(TradesContainer);
