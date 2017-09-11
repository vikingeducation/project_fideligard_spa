import React, { Component } from "react";
import { connect } from "react-redux";
import { getStocks } from "../actions/stocks";
import Input from "../Components/elements/Input";

//testing table
import Table from "../Components/elements/Table";
const columns = ["Symbol", "Price", "1d", "7d", "30d", "Trade?"];
// const rows = [["AAPL", 100], ["thing", "stuff"]];

class StockContainer extends Component {
  constructor(props) {
    super(props);
  }
  //lifecycle hooks?
  componentDidMount() {
    //fetch some data from our api
    // dispatch(getStocks);
    this.props.fetchStocks();
  }
  //needs filtering
  //needs sorting

  render() {
    // const stockData = this.props.stocks;
    //i need to transform the arrays of stock data in redux
    //into dataRows that I need
    const tickers = ["V", "UNH"];
    let rows = [];
    const defaultDate = new Date("2016 01 02");
    console.log("default date = ", defaultDate);
    if (!this.props.isFetching) {
      console.log("not fetching, ", this.props.isFetching);
      for (let index in tickers) {
        let ticker = tickers[index];
        console.log("ticker = ", ticker);
        console.log("this.props.stocks[ticker] = ", this.props.stocks[ticker]);
        let price;
        if (this.props.stocks[ticker]) {
          console.log("date??", this.props.stocks[ticker].prices);
          console.log(
            "default date??",
            this.props.stocks[ticker].prices[defaultDate]
          );
          price = this.props.stocks[ticker].prices[defaultDate].price || 0;
          console.log("price = ", price);
        } else {
          price = 0;
        }
        console.log("price = ", price);
        rows.push([ticker, price]);
      }
    } else {
      const rows = [["AAPL", 100], ["thing", "stuff"]];
    }

    // console.log("sC props = ", this.props);
    console.log("rows = ", rows);

    return (
      <div className="container-fluid">
        <div id="stock-controls" className="row">
          <div className="col-6">
            <p>Stocks</p>
          </div>
          <div className="col-6">
            <p>Filter</p>
            <Input />
          </div>
        </div>
        <div className="row">
          {/* <Table rows={rows} columns={columns} /> */}
          <Table rows={rows} columns={columns} />
        </div>
      </div>
    );
  }
}
//stocks should look like this
/*
stocks = {
  tickerName: {
    'date': {
      price: Number,
      '1d': Number,
      '7d': Number,
      '30d': Number
    }
  }
};
*/
//data I need ["Symbol", "Price", "1d", "7d", "30d", "Trade?"];
const selectData = (stocks, currentDate) => {};

const mapStateToProps = state => {
  console.log("state in stockContainer = ", state);
  return {
    stocks: state.stocks.stocks,
    isFetching: state.stocks.isFetching,
    error: state.stocks.error
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchStocks: () => {
      dispatch(getStocks());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StockContainer);
