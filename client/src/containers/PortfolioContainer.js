import { connect } from "react-redux";
import Portfolio from "../components/Portfolio";
import serialize from "form-serialize";
// import { setPortfolio, resetPortfolio, addStockToList, getStocks } from "../actions";

const mapStateToProps = state => {
  return {
    stockData: state.stockData,
    portfolio: state.portfolio,
    transactions: state.transactions,
    balance: state.balance
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  };
};

const PortfolioContainer = connect(mapStateToProps, mapDispatchToProps)(Portfolio);

export default PortfolioContainer;
