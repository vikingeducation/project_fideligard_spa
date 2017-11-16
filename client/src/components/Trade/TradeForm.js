import React, { Component } from "react";
import PropTypes from "prop-types";
import serialize from "form-serialize";
import { withRouter } from "react-router-dom";
import {
  setTradeSymbol,
  setTradePrice,
  setTradeDate,
  setTradeQuantity,
  setTradeBuy,
  setCashAmount,
  setTransaction
} from "../../actions";
import { displayDate } from "../../helpers/helper";
import { connect } from "react-redux";
import Trade from "./Trade";

function indexOfStocks(stock, symbol) {
  let matched = false;
  if (!stock && !symbol) {
    return [false, 0];
  }
  for (var i = 0; i < stock.length && !matched; i++) {
    if (stock[i][0] === symbol) {
      matched = true;
    }
  }

  return [matched, i - 1];
}

class TradeForm extends Component {
  componentWillMount() {
    let matched;
    if (this.props.match.params) {
      matched = indexOfStocks(
        this.props.todayStocks.data,
        this.props.match.params.symbol
      );
      if (matched[0]) {
        this.props.setPrice([
          this.props.todayStocks.data[matched[1]][2],
          this.props.yesterStocks.data[matched[1]][2],
          this.props.weekStocks.data[matched[1]][2],
          this.props.monthStocks.data[matched[1]][2]
        ]);
        this.props.setDate([
          this.props.todayStocks.data[matched[1]][1],
          this.props.yesterStocks.data[matched[1]][1],
          this.props.weekStocks.data[matched[1]][1],
          this.props.monthStocks.data[matched[1]][1]
        ]);
        this.props.setSymbol(this.props.match.params.symbol);
        this.props.setQuantity(1);
      } else {
        this.props.setPrice([0]);
        this.props.setQuantity(1);
        this.props.setSymbol("A");
        this.props.setDate([
          this.props.todayStocks.data[0][1],
          this.props.yesterStocks.data[0][1],
          this.props.weekStocks.data[0][1],
          this.props.monthStocks.data[0][1]
        ]);
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    let matched;
    //Set from link
    if (
      nextProps.match.params !== this.props.match.params &&
      nextProps.match.params.symbol
    ) {
      matched = indexOfStocks(
        this.props.todayStocks.data,
        nextProps.match.params.symbol
      );
      if (matched[0]) {
        this.props.setSymbol(nextProps.match.params.symbol);
        nextProps.setDate([
          this.props.todayStocks.data[matched[1]][1],
          this.props.yesterStocks.data[matched[1]][1],
          this.props.weekStocks.data[matched[1]][1],
          this.props.monthStocks.data[matched[1]][1]
        ]);
        nextProps.setPrice([
          this.props.todayStocks.data[matched[1]][2],
          this.props.yesterStocks.data[matched[1]][2],
          this.props.weekStocks.data[matched[1]][2],
          this.props.monthStocks.data[matched[1]][2]
        ]);
      } else {
        nextProps.setPrice([0]);
        this.props.setQuantity(1);
        this.props.setSymbol("A");
        nextProps.setDate([
          this.props.todayStocks.data[0][1],
          this.props.yesterStocks.data[0][1],
          this.props.weekStocks.data[0][1],
          this.props.monthStocks.data[0][1]
        ]);
      }
    }
    //New symbol
    if (nextProps.trade.symbol !== this.props.trade.symbol) {
      matched = indexOfStocks(
        this.props.todayStocks.data,
        nextProps.trade.symbol
      );

      if (matched[0]) {
        nextProps.setPrice([
          this.props.todayStocks.data[matched[1]][2],
          this.props.yesterStocks.data[matched[1]][2],
          this.props.weekStocks.data[matched[1]][2],
          this.props.monthStocks.data[matched[1]][2]
        ]);
        nextProps.setDate([
          this.props.todayStocks.data[matched[1]][1],
          this.props.yesterStocks.data[matched[1]][1],
          this.props.weekStocks.data[matched[1]][1],
          this.props.monthStocks.data[matched[1]][1]
        ]);
      } else {
        nextProps.setPrice([0]);
      }
    }
  }
  render() {
    const { valid } = this.props;
    return <Trade valid={valid} />;
  }
}

const mapStateToProps = state => {
  return {
    trade: state.trade,
    todayStocks: state.todayStocks,
    yesterStocks: state.yesterStocks,
    weekStocks: state.weekStocks,
    monthStocks: state.monthStocks,
    cash: state.cash,
    transactions: state.transactions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSymbol: symbol => {
      dispatch(setTradeSymbol(symbol));
    },
    setPrice: price => {
      dispatch(setTradePrice(price));
    },
    setDate: date => {
      dispatch(setTradeDate(date));
    },
    setQuantity: quantity => {
      dispatch(setTradeQuantity(quantity));
    },
    setBuy: buy => {
      dispatch(setTradeBuy(buy));
    },
    tradeStock: e => {
      e.preventDefault();
      const form = e.target;
      let data = serialize(form, { hash: true });
      data.date = data.date.split(",");
      data.price = data.price.split(",");
      data.date[0] = displayDate(data.date[0]);
      data.date[1] = displayDate(data.date[1]);
      data.date[2] = displayDate(data.date[2]);
      data.date[3] = displayDate(data.date[3]);
      data.quantity = Number(data.quantity);
      if (data.quantity > 0) {
        dispatch(setTransaction(data));
        if (data.type === "BUY") {
          dispatch(
            setCashAmount(Number(data.cash) - data.quantity * data.price[0])
          );
        } else {
          dispatch(
            setCashAmount(Number(data.cash) + data.quantity * data.price[0])
          );
        }

        form.reset();
      }
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TradeForm)
);
