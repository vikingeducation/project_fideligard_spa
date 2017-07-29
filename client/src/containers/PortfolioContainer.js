import { connect } from "react-redux";
import Portfolio from "../components/Portfolio";
// import serialize from "form-serialize";
import { getSpecificStock } from "../actions";

const mapStateToProps = state => {
  return {
    stockData: state.stockData.stocks,
    portfolio: state.portfolio,
    transactions: state.transactions,
    balance: state.balance,
    date: state.date
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClickTrade: (stock, date) => {
      dispatch(getSpecificStock(stock, date));
    }
  };
};

const PortfolioContainer = connect(mapStateToProps, mapDispatchToProps)(Portfolio);

export default PortfolioContainer;
