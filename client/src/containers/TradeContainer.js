import React from "react";
import Dropdown from "../components/Dropdown";
import TradeForm from "../components/Trade/TradeForm";

import { connect } from "react-redux";

const TradeContainer = ({ trade, cash, transactions, todayStocks }) => {
  let validIndic;
  let valid = false;
  if (trade.buy === "BUY") {
    if (cash - trade.quantity * trade.price[0] > 0) {
      valid = true;
      validIndic = <p>VALID</p>;
    } else {
      validIndic = <p>INVALID</p>;
    }
  } else {
    let matched = false;
    for (var i = 0; i < transactions.length; i++) {
      if (
        transactions[i].symbol === trade.symbol &&
        trade.quantity <= transactions[i].quantity
      ) {
        matched = true;
      }
    }
    if (matched) {
      valid = true;
      validIndic = <p>VALID SELL</p>;
    } else {
      validIndic = <p>INVALID SELL</p>;
    }
  }
  return (
    <div className="container trade bordered">
      <div className="row">
        <div className="col-8">
          <h4>Trade</h4>
        </div>
        <div className="col-4">
          <Dropdown />
        </div>
      </div>
      <div className="row">
        <div className="col">
          {todayStocks.data ? <TradeForm valid={valid} /> : ""}
        </div>
        <div className="col">
          <h5>Cash Available:</h5>
          <p>${cash.toFixed(2)}</p>
          <h5>Order Status</h5>
          {validIndic}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    trade: state.trade,
    cash: state.cash,
    transactions: state.transactions,
    todayStocks: state.todayStocks
  };
};

export default connect(mapStateToProps)(TradeContainer);
