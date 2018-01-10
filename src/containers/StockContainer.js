import React, { Component } from "react";
import { connect } from "react-redux";
import App from "../components/App";
import serialize from "form-serialize";
import { getStockData, setStock } from "../actions";
import { withRouter } from "react-router-dom";
import StockPanel from "../components/StockPanel";

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    stocks: state.stocksReducer.stocks,
    stocksArray: state.stocksReducer.stocksArray,
    date: state.stocksReducer.date
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getStockData: () => {
      dispatch(getStockData("AAPL"));
    }
  };
};

const StockContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(StockPanel)
);
export default StockContainer;
