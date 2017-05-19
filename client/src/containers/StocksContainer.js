import React, { Component } from "react";
import { connect } from "react-redux";
import Stocks from "../components/Stocks";
import { fetchStocks, setStocksFilter } from "../actions/stocksAction";

class StocksContainer extends Component {
  componentDidMount() {
    this.props.fetchStocks(this.props.date);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.date !== this.props.date) {
      this.props.fetchStocks(newProps.date);
    }
  }

  render() {
    return <Stocks {...this.props} />;
  }
}

const filterStocks = (stocks, filterBy) => {
  let regex = new RegExp(filterBy, "i");
  return stocks.filter(stock => regex.exec(stock.symbol));
};
function mapStateToProps(state) {
  return {
    stocks: filterStocks(state.stocks.data, state.stocks.filter),
    isFetching: state.stocks.isFetching,
    date: state.date
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchStocks: date => {
      dispatch(fetchStocks(date));
    },
    setStocksFilter: e => {
      dispatch(setStocksFilter(e.target.value));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StocksContainer);
