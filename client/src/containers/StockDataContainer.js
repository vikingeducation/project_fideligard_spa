import React, { Component } from "react";
import { connect } from "react-redux";
import StockData from '../components/StockData';
import {getStocks, getSpecificStock} from '../actions';

class StockDataContainer extends Component {
  componentDidMount() {
    this.props.getAllStocks(this.props.stockWatchlist, this.props.specificStock.symbol, this.props.date);
  }

  render() {
    return <StockData {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    stockWatchlist: state.stockWatchlist,
    specificStock: state.specificStockData.stock,
    date: state.date,
    isFetching: state.stockData.isFetching,
    sortDirection: state.sortDirection
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllStocks: (stocks, specificStock, date) => {
      dispatch(getStocks(stocks, date));
      dispatch(getSpecificStock(specificStock, date));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(
  StockDataContainer
);
