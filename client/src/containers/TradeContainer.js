import React, { Component } from "react";
import { connect } from "react-redux";
import Trade from "../components/Trade";
import parse from "url-parse";
import serialize from "form-serialize";
import {
  selectTrade,
  changeQuantity,
  changeType,
  removeTrade
} from "../actions/tradeAction";
import { changeDate } from "../actions/dateAction";
import { changeCash } from "../actions/cashAction";
import { makeTransaction } from "../actions/transactionsAction";
import { getPortfolio } from "../helpers";

class TradeContainer extends Component {
  componentDidMount() {
    let url = parse(this.props.location.search, true);
    let symbol = url.query.symbol || "A";
    this.props.selectTrade(this.props.stocks, symbol);
  }
  componentWillReceiveProps(newProps) {
    let url = parse(newProps.location.search, true);
    let symbol = url.query.symbol || "A";
    if (newProps.location.search !== this.props.location.search) {
      this.props.selectTrade(this.props.stocks, symbol);
    }
    if (newProps.stocks[0] !== this.props.stocks[0]) {
      this.props.selectTrade(newProps.stocks, symbol);
    }
  }

  render() {
    return <Trade {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    date: state.date,
    stocks: state.stocks.data,
    trade: state.trade,
    cash: state.cash,
    transactions: state.transactions,
    portfolio: getPortfolio(state.transactions, state.date, state.stocks.data)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    selectTrade: (stocks, symbol) => {
      let trade = stocks.find(stock => stock.symbol === symbol);
      dispatch(selectTrade(trade));
    },
    changeQuantity: e => {
      dispatch(changeQuantity(+e.target.value));
    },
    changeDate: e => {
      dispatch(changeDate(e.target.value));
    },
    changeType: e => {
      dispatch(changeType(e.target.value));
    },
    onSubmit: cash => e => {
      e.preventDefault();
      const form = e.target;
      const data = serialize(form, { hash: true, disabled: true });
      let adjustedData = {
        date: data.date,
        symbol: data.symbol,
        type: data.type,
        quantity: +data.quantity,
        price: +data.price.slice(1)
      };
      if (cash >= +data.cost.slice(1)) {
        let totalCost = data.type === "buy"
          ? +data.cost.slice(1)
          : -data.cost.slice(1);
        dispatch(changeCash(totalCost));
        dispatch(makeTransaction(adjustedData));
        dispatch(removeTrade());

        ownProps.history.push(`/trade/success`);
      }
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TradeContainer);
