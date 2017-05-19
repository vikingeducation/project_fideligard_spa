import React, { Component } from "react";
import { connect } from "react-redux";
import Trade from "../components/Trade";
import parse from "url-parse";
import serialize from "form-serialize";
import { selectTrade, changeQuantity } from "../actions/tradeAction";

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
    trade: state.trade
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectTrade: (stocks, symbol) => {
      let trade = stocks.find(stock => stock.symbol === symbol);
      dispatch(selectTrade(trade));
    },
    changeQuantity: e => {
      dispatch(changeQuantity(+e.target.value));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TradeContainer);
