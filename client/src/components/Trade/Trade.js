import React, { Component } from "react";
import {
  setTradeSymbol,
  setTradePrice,
  setTradeDate,
  setTradeQuantity,
  setTradeBuy,
  setCashAmount,
  setTransaction
} from "../../actions";
import { connect } from "react-redux";
import TradeForm from "./TradeForm";

class Trade extends Component {
  render() {
    return <TradeForm trade={this.props.trade} match={this.props.match} />;
  }
}

const mapStateToProps = state => {
  return {
    trade: state.trade
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setDate: date => {
      dispatch(setTradeDate(date));
    },
    setSymbol: symbol => {
      dispatch(setTradeSymbol(symbol));
    },
    setBuy: buyOrSell => {
      dispatch(setTradeBuy(buyOrSell));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Trade);
