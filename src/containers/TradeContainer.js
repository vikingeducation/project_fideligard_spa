import React, { Component } from "react";
import { connect } from "react-redux";
import App from "../components/App";
import serialize from "form-serialize";
import { changeOrderType, doTransaction, changeQuantity } from "../actions";
import { withRouter } from "react-router-dom";
import TradePanel from "../components/TradePanel";

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    ticker: state.stocksReducer.ticker,
    balance: state.stocksReducer.balance
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: e => {
      e.preventDefault();
      const form = e.target;
      const data = serialize(form, { hash: true });

      //      dispatch((data));
      form.reset();
    },
    changeOrderType: e => {
      if (e.target.value === "BUY") {
        dispatch(changeOrderType("BUY"));
      } else {
        dispatch(changeOrderType("SELL"));
      }
    },
    changeQuantity: e => {
      dispatch(changeQuantity(e.target.value));
    }
  };
};

const TradeContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TradePanel)
);
export default TradeContainer;
