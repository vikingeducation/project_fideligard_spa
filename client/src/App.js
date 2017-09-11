import React, { Component } from "react";
import { BrowserRouter as Router, withRouter } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { Slider } from "./components/Slider";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";

import "./App.css";

const SidebarRoute = withRouter(Sidebar);
const MainRoute = withRouter(Main);

class App extends Component {
  constructor() {
    super();
    this.state = {
      sideBarData: [],
      symbol: "AAPL",
      price: 0,
      quantity: 0
    };
  }

  componentDidMount = async () => {
    await Promise.resolve(this.props.getStocks());
    const sideBarData = this.formatSidebarData(
      this.props.stockData[this.props.date]
    );
    await this.setState({ sideBarData: sideBarData });
    await this.setState({
      price: Number(
        this.state.sideBarData.filter(row => row[0] === this.state.symbol)[0][1]
      )
    });
  };

  formatSidebarData = data => {
    const dataArray = Object.entries(data);
    const date = new Date(this.props.date);
    return dataArray.map(row => {
      row.push(Number(row[1] - this.prevData(date, -1, row[0])).toFixed(2));
      row.push(Number(row[1] - this.prevData(date, -7, row[0])).toFixed(2));
      row.push(Number(row[1] - this.prevData(date, -30, row[0])).toFixed(2));
      return row;
    });
  };

  parseDate = (date, change, symbol) => {
    let newdate = new Date(date);
    newdate.setDate(newdate.getDate() + change);
    return newdate.toISOString().split("T")[0];
  };

  prevData = (date, difference, symbol) => {
    const string = this.parseDate(date, difference);
    return this.props.stockData[string][symbol];
  };

  changeDate = async e => {
    const date = new Date(2015, 0, 1);
    const string = this.parseDate(date, Number(e.target.value));
    await Promise.resolve(this.props.setDate(string));

    const sideBarData = this.formatSidebarData(
      this.props.stockData[this.props.date]
    );

    await Promise.resolve(this.setState({ sideBarData: sideBarData }));
  };

  changePage = e => {
    //
  };

  handleClick = (symbol, price) => {
    this.setState({ symbol: symbol, price: price });
  };

  changeQuantity = e => {
    console.log(e.target.value);
    this.setState({ quantity: Number(e.target.value) });
  };

  handleFormSubmit = async e => {
    e.preventDefault();

    let price, quantity;
    const symbol = e.target.symbol.value;
    const buySell = e.target.buySell.value;

    const transaction = {
      date: this.props.date,
      symbol: symbol,
      type: buySell,
      quantity: e.target.quantity.value,
      price: this.state.price
    };

    if (buySell === "buy") {
      price = 0 - this.state.price;
      quantity = 0 - e.target.quantity.value;
    } else {
      price = this.state.price;
      quantity = e.target.quantity.value;
    }

    const portfolioData = {
      symbol: e.target.symbol.value,
      quantity: e.target.quantity.value,
      price: price
    };

    await this.props.createTransaction(transaction);
    await this.props.updatePortfolio(portfolioData);
    await this.props.updateBalance(price);
    console.log(this.props);
  };

  render() {
    return (
      <div className="App">
        <Navbar />
        <Router>
          <div className="container">
            <SidebarRoute
              data={this.state.sideBarData}
              onClick={this.handleClick}
            />
            <Slider onChange={this.changeDate} date={this.props.date} />
            <MainRoute
              onChange={this.changePage}
              date={this.props.date}
              symbol={this.state.symbol}
              transactionData={this.props.transactions}
              balance={this.props.balance}
              price={this.state.price}
              changeQuantity={this.changeQuantity}
              total={this.state.quantity * this.state.price}
              onSubmit={this.handleFormSubmit}
            />
            )}
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
