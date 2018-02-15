import Button from "../elements/Button";
import React, { Component } from "react";
// import PropTypes from "prop-types";
import {
  setTradeSymbol,
  setTradePrice,
  setTradeDate,
  setTradeQuantity,
  setTradeBuy,
  setCashAmount,
  setTransaction,
  getApiData
} from "../../actions";
import { apiDate } from "../../helpers/helper";
import { connect } from "react-redux";

import TradeSymbol from "./TradeForm/TradeSymbol";
import TradeBuy from "./TradeForm/TradeBuy";
import TradeQuantity from "./TradeForm/TradeQuantity";
import TradeDate from "./TradeForm/TradeDate";

class TradeForm extends Component {
  submitButtonFunc = (trade, valid) => {
    let submitButton;
    if (trade.buy === "BUY") {
      if (valid) {
        submitButton = (
          <Button color="primary" type="submit">
            Place Order!
          </Button>
        );
      } else {
        submitButton = (
          <Button color="primary" type="submit" disabled>
            Too Much!
          </Button>
        );
      }
    } else if (trade.buy === "SELL") {
      if (valid) {
        submitButton = (
          <Button color="primary" type="submit">
            Sell Stocks!
          </Button>
        );
      } else {
        submitButton = (
          <Button color="primary" type="submit" disabled>
            Don't Own!
          </Button>
        );
      }
    }
    return submitButton;
  };

  tradeStock = e => {
    e.preventDefault();
    let data = this.props.trade;
    data.quantity = Number(data.quantity);
    if (data.quantity > 0) {
      this.props.setTransaction(data);
      if (data.buy === "BUY") {
        this.props.setCashAmount(
          Number(this.props.cash) - Number(data.quantity) * Number(data.price)
        );
      } else {
        data.quantity *= -1;
        this.props.setCashAmount(
          Number(this.props.cash) + Number(data.quantity) * Number(data.price)
        );
      }
    }
  };

  render() {
    const { trade, cash, transactions, stocks } = this.props;

    let valid = false;
    let cost = Number(trade.price) * Number(trade.quantity);
    if (trade.buy === "BUY") {
      if (Number(cost) <= Number(cash)) {
        if (stocks[trade.date]) {
          valid = true;
        }
      }
    } else {
      let match = false;
      let index = 0;
      for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].symbol === trade.symbol) {
          match = true;
          index = i;
          break;
        }
      }
      if (match && trade.quantity <= transactions[index].quantity) {
        valid = true;
      }
    }

    let submitButton = this.submitButtonFunc(trade, valid);

    return (
      <div className="row">
        <div className="col">
          <form onSubmit={this.tradeStock.bind(this)}>
            <TradeSymbol {...this.props} />
            <TradeBuy {...this.props} />
            <TradeQuantity {...this.props} />
            <TradeDate {...this.props} />
            <p>
              <b>Price</b> ${trade.price
                ? Number(trade.price).toFixed(2)
                : "0.00"}
            </p>
            {/* <Input type="hidden" value={trade.price} name="price" /> */}
            <p>
              <b>Cost</b> ${cost ? cost.toFixed(2) : "0.00"}
            </p>
            {/* <Input type="hidden" value={cash} name="cash" /> */}
            {submitButton}
          </form>
        </div>
        <div className="col">
          <h5>Cash Available:</h5>
          <p>${this.props.cash.toFixed(2)}</p>
          <h5>Order Status</h5>
          {valid ? "VALID" : "NOT VALID"}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    stocks: state.stocks,
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
    getApiData: (date, stocks) => {
      dispatch(getApiData(apiDate(date), stocks));
    },
    setCashAmount: amount => {
      dispatch(setCashAmount(amount));
    },
    setTransaction: data => {
      dispatch(setTransaction(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TradeForm);
