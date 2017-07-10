import React, { Component } from "react";
import { connect } from "react-redux";
import StockData from '../components/StockData';
import {getStocks} from '../actions';

class StockDataContainer extends Component {
  componentDidMount() {
    this.props.getStocks(this.props.stockWatchlist, this.props.date);
  }

  render() {
    return <StockData {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    stockWatchlist: state.stockWatchlist,
    stockData: state.stockData,
    date: state.date
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getStocks: (stocks, date) => {
      dispatch(getStocks(stocks, date));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(
  StockDataContainer
);
