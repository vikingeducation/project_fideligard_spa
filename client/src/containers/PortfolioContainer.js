import React, { Component } from "react";
import { connect } from "react-redux";
import Portfolio from "../components/Portfolio";
import { getPortfolio } from "../helpers";

class PortfolioContainer extends Component {
  render() {
    return <Portfolio {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    transactions: state.transactions,
    stocks: state.stocks.data,
    date: state.date,
    portfolio: getPortfolio(state.transactions, state.date, state.stocks.data),
    cash: state.cash
  };
};

export default connect(mapStateToProps, null)(PortfolioContainer);
