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
    const sideBarData = this.formatSidebarData(
      this.props.stockData[this.props.date]
    );
    this.setState({ sideBarData: sideBarData });
  };

  formatSidebarData = data => {
    const dataArray = Object.entries(data);
    const date = new Date(this.props.date);
    return dataArray.map(row => {
      row.push(Number(row[1] - this.parseDate(date, 1, row[0])).toFixed(2));
      row.push(Number(row[1] - this.parseDate(date, 7, row[0])).toFixed(2));
      row.push(Number(row[1] - this.parseDate(date, 30, row[0])).toFixed(2));
      return row;
    });
  };

  parseDate = (date, difference, symbol) => {
    let newdate = new Date(date);
    newdate.setDate(newdate.getDate() - difference);
    const string = newdate.toISOString().split("T")[0];
    return this.props.stockData[string][symbol];
  };

  render() {
    return (
      <div className="App">
        <Navbar />
        <Slider />
        <Sidebar columnNames={sidebarColumns} data={this.state.sideBarData} />
        <BrowserRouter>
          <div className="routeContainer">
            <Route exact path="/trades" component={Trades} />
            <Route exact path="/transactions" component={Transactions} />
            <Route exact path="/portfolio" component={Portfolio} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
