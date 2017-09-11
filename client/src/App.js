import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Slider } from "./components/Slider";
import { Sidebar } from "./components/Sidebar";
import Trades from "./components/Trades";
import Transactions from "./components/Transactions";
import Portfolio from "./components/Portfolio";
import "./App.css";

const sidebarColumns = [
  "Symbol",
  "Price",
  "1 Day",
  "7 Day",
  "30 Day",
  "Trade?"
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      sideBarData: []
    };
  }

  componentDidMount = async () => {
    await Promise.resolve(this.props.getStocks());
    this.updateSideBar();
  };

  updateSideBar = () => {
    const sideBarData = this.formatSidebarData(
      this.props.stockData[this.props.date]
    );
    this.setState({ sideBarData: sideBarData });
  };

  formatSidebarData = data => {
    const dataArray = Object.entries(data);
    const date = new Date(this.props.date);
    return dataArray.map(row => {
      row.push(
        Number(row[1] - this.calcPriceDiff(date, -1, row[0])).toFixed(2)
      );
      row.push(
        Number(row[1] - this.calcPriceDiff(date, -7, row[0])).toFixed(2)
      );
      row.push(
        Number(row[1] - this.calcPriceDiff(date, -30, row[0])).toFixed(2)
      );
      return row;
    });
  };

  parseDate = (date, change) => {
    let newdate = new Date(date);
    console.log(newdate);
    newdate.setDate(newdate.getDate() + change);
    return newdate.toISOString().split("T")[0];
  };

  calcPriceDiff = (date, change, symbol) => {
    const dateString = this.parseDate(date, change);
    return this.props.stockData[dateString][symbol];
  };

  changeDate = async e => {
    const newDate = this.parseDate("2015-01-01", e.target.value);
    console.log(newDate);
    await Promise.resolve(this.props.setDate(newDate));
    console.log(this.props.date);
    await Promise.resolve(this.updateSideBar());
  };

  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Sidebar columnNames={sidebarColumns} data={this.state.sideBarData} />
          <Slider onChange={this.changeDate} />
          <BrowserRouter>
            <div className="routeContainer">
              <Route exact path="/trades" component={Trades} />
              <Route exact path="/transactions" component={Transactions} />
              <Route exact path="/portfolio" component={Portfolio} />
            </div>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App;
