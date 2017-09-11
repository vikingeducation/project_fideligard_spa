import React, { Component } from "react";
import { connect } from "react-redux";
import serialize from "form-serialize";
import {
  updateBalance,
  setSymbol,
  setThisDatePrice,
  buyStock
} from "../actions";
import Trades from "../components/Trades";

class TradesContainer extends Component {
  constructor() {
    super();
    this.state = {
      quantity: 1,
      date: "2015-02-14",
      price: "",
      symbol: null
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.thisDatePrice !== this.state.price) {
      this.setState({ price: newProps.thisDatePrice });
    }
    if (newProps.symbol !== this.state.symbol) {
      this.setState({ symbol: newProps.symbol });
    }
  }

  onDateChange = e => {
    let price = this.props.stockData[e.target.value][this.state.symbol];
    this.setState({
      date: e.target.value,
      price: price
    });
  };

  onQuantityChange = e => {
    this.setState({
      quantity: e.target.value
    });
  };

  render() {
    return (
      <Trades
        {...this.props}
        state={this.state}
        onDateChange={this.onDateChange}
        onQuantityChange={this.onQuantityChange}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    stockData: state.stockData,
    date: state.date,
    balance: state.balance,
    symbol: state.symbol,
    thisDatePrice: state.thisDatePrice,
    thisDateStocks: state.thisDateStocks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateBalance: amount => {
      dispatch(updateBalance(amount));
    },
    setSymbol: e => {
      dispatch(setSymbol(e.target.value));
    },
    setThisDatePrice: price => {
      dispatch(setThisDatePrice(price));
    },
    buyStock: e => {
      e.preventDefault();
      const data = serialize(e.target, { hash: true });
      dispatch(buyStock(Number(data.total), data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TradesContainer);
