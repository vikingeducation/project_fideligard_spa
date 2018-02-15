import React, { Component } from "react";
import {
  setTradeSymbol,
  setTradePrice,
  setTradeDate,
  setTradeQuantity,
  getApiData
} from "../../actions";
import { apiDate } from "../../helpers/helper";
import { connect } from "react-redux";
import TradeForm from "./TradeForm";

class Trade extends Component {
  componentWillMount() {
    if (Object.keys(this.props.match.params).length) {
      this.props.setDate(this.props.match.params.date);
      this.props.setSymbol(this.props.match.params.symbol);
      this.props.setPrice(this.props.match.params.price);
      this.props.setQuantity(1);
    } else {
      this.props.setDate(new Date());
      this.props.setSymbol("");
      this.props.setPrice(0);
    }
  }
  componentWillReceiveProps(nextProps) {
    //if url params change
    if (nextProps.match !== this.props.match) {
      if (Object.keys(nextProps.match.params).length) {
        nextProps.setDate(nextProps.match.params.date);
        nextProps.setSymbol(nextProps.match.params.symbol);
        nextProps.setPrice(nextProps.match.params.price);
      }
      //if input changed
    } else if (
      this.props.trade.quantity !== nextProps.trade.quantity ||
      this.props.trade.date !== nextProps.trade.date ||
      this.props.trade.symbol !== nextProps.trade.symbol ||
      this.props.trade.price !== nextProps.trade.price
    ) {
      //if stocks has data
      if (nextProps.stocks[nextProps.trade.date]) {
        nextProps.setPrice(
          nextProps.stocks[nextProps.trade.date][nextProps.trade.symbol]
        );
        //get data
      } else {
        nextProps.setPrice(0);
        nextProps.getApiData(apiDate(nextProps.trade.date), nextProps.stocks);
      }
      //if stocks changed
    } else if (
      Object.keys(this.props.stocks).length !==
      Object.keys(nextProps.stocks).length
    ) {
      //if have data, changed price
      if (nextProps.stocks[nextProps.trade.date]) {
        nextProps.setPrice(
          nextProps.stocks[nextProps.trade.date][nextProps.trade.symbol]
        );
      } else {
        nextProps.setPrice(0);
      }
    }
  }
  render() {
    return <TradeForm trade={this.props.trade} match={this.props.match} />;
  }
}

const mapStateToProps = state => {
  return {
    trade: state.trade,
    stocks: state.stocks
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
    setPrice: price => {
      dispatch(setTradePrice(price));
    },
    setQuantity: quantity => {
      dispatch(setTradeQuantity(quantity));
    },
    getApiData: (date, stocks) => {
      dispatch(getApiData(date, stocks));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Trade);
