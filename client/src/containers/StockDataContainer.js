import React, { Component } from "react";
import { connect } from "react-redux";
import StockData from '../components/StockData';
import {getInitialStocks} from '../actions';

class StockDataContainer extends Component {
  componentDidMount() {
    this.props.getInitialStocks(this.props.stockWatchlist, this.props.date);
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
    getInitialStocks: (stocks, date) => {
      dispatch(getInitialStocks(stocks, date));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(
  StockDataContainer
);
