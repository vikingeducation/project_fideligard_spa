import React, { Component } from "react";
import { connect } from "react-redux";
import { getStocks } from "../actions/stocks";
import Input from "../Components/elements/Input";
import Caret from "../Components/elements/Caret";

//testing table
import Table from "../Components/elements/Table";
const columns = ["Symbol", "Price", "1d", "7d", "30d", "Trade?"];
// const rows = [["AAPL", 100], ["thing", "stuff"]];

class StockContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      displayStockList: [],
      filter: "",
      sort: "ASC"
    };
    this.onChange = this.onChange.bind(this);
    this.setSort = this.setSort.bind(this);
  }
  //lifecycle hooks?
  componentDidMount() {
    //fetch some data from our api
    // dispatch(getStocks);
    this.props.fetchStocks();
  }
  //needs filtering
  //needs sorting

  setSort = e => {
    console.log("clicked");
    // console.log("e.target =", e.target, e.target.data);
    // console.log(e.target.)
    console.log("state = ", this.state);
    console.log("this = ", this);
    let sorting;
    if (this.state.sort === "ASC") {
      sorting = "DESC";
    } else if (this.state.sort === "DESC") {
      sorting = "ASC";
    } else {
      console.error(new Error("unrecognized sort state"));
    }
    this.setState(() => {
      return {
        sort: sorting
      };
    });
    //do the sort
  };
  sortHash = {
    ASC: (a, b) => {
      b[0] - a[0];
    },
    DESC: (a, b) => {
      a[0] - b[0];
    }
  };
  sortStocks = rows => {
    let newRows = rows;
    console.log("rows in sort");
    // return newRows;

    return rows.sort(this.sortHash[this.state.sort]);
  };
  //note filtering is case-sensitive
  filterStocks = rows => {
    let newRows = rows;
    console.log("filter = ", this.state.filter);
    console.log("rows in filter", rows);
    return rows.filter(row => {
      return row[0].includes(this.state.filter);
    });
  };

  onChange = e => {
    console.log("e ", e);
    console.log(e.target);
    //set filter
    console.log("this = ", this);
    this.setState({ [e.target.name]: e.target.value });
    // this.setState((previous, props) => {
    //   console.log("props = ", props);
    //   console.log("previous = ", previous);
    //   // return {
    //   //   filter: e.target.value
    //   // };
    // });
    // this.setState = {
    //   filter: e.target.value
    // };
  };

  render() {
    // const stockData = this.props.stocks;
    //i need to transform the arrays of stock data in redux
    //into dataRows that I need
    console.log("state = ", this.state);
    const tickers = ["V", "UNH"]; //fix the server to include this later
    let rows = [];
    const defaultDate = "2016-1-2";
    if (!this.props.isFetching) {
      for (let index in tickers) {
        let ticker = tickers[index];
        // console.log("ticker = ", ticker);
        // console.log("this.props.stocks[ticker] = ", this.props.stocks[ticker]);
        let price;
        if (this.props.stocks[ticker]) {
          // console.log("date??", this.props.stocks[ticker].prices);
          // console.log(
          //   "default date??",
          //   this.props.stocks[ticker].prices[defaultDate]
          // );
          price = this.props.stocks[ticker].prices[defaultDate].price || 0;
          // console.log("price = ", price);
        } else {
          price = 0;
        }
        // console.log("price = ", price);
        rows.push([ticker, price]);
      }
    } else {
      const rows = [["AAPL", 100], ["thing", "stuff"]];
    }

    // console.log("sC props = ", this.props);
    console.log("rows = ", rows);
    rows = this.filterStocks(rows);
    console.log("rows after filter = ", rows);
    rows = this.sortStocks(rows);
    console.log("rows after sort = ", rows);
    const filter = this.state.filter;
    // const sorted = "asc";
    return (
      <div className="container-fluid">
        {/* <div>Test: {filter}</div> */}
        <div id="stock-controls" className="row">
          <div className="col-6">
            <p>Stocks</p>
          </div>
          <div className="col-6">
            <p>Filter</p>
            <Input
              name="filter"
              value={this.state.filter}
              onChange={this.onChange}
            />
          </div>
        </div>
        <div className="row">
          {/* <Table rows={rows} columns={columns} /> */}
          <Table
            rows={rows}
            columns={columns}
            sorted={this.state.sort}
            sortFunction={this.setSort}
          />
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
//what does this do again???
//data I need ["Symbol", "Price", "1d", "7d", "30d", "Trade?"];
const selectData = (stocks, currentDate) => {};

const mapStateToProps = state => {
  console.log("state in stockContainer = ", state);
  return {
    ...state,
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
