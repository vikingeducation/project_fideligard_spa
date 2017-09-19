import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { setSymbol, setThisDatePrice } from "../actions";

const mapStateToProps = state => {
  return {
    sideBarData: state.sideBarData,
    date: state.date,
    stockData: state.stockData,
    thisDatePrice: state.thisDatePrice,
    symbol: state.symbol
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onClick: (symbol, price) => {
      dispatch(setSymbol(symbol));
      dispatch(setThisDatePrice(price));
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Sidebar)
);
