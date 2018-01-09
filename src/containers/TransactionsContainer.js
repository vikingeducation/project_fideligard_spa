import React, { Component } from "react";
import { connect } from "react-redux";
import App from "../components/App";
import serialize from "form-serialize";
import { getStockData, setStock } from "../actions";
import { withRouter } from "react-router-dom";
import TransactionsPanel from "../components/TransactionsPanel";

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    stocks: state.stocksReducer.stocks,
    stocksArray: state.stocksReducer.stocksArray,
    date: state.stocksReducer.date
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

const TransactionsContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TransactionsPanel)
);
export default TransactionsContainer;
