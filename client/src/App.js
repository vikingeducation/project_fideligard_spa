import React, { Component } from "react";

import { Navbar } from "./components/Navbar";
import { Slider } from "./components/Slider";
import { Sidebar } from "./components/Sidebar";
import Main from "./components/Main";

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

  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Sidebar columnNames={sidebarColumns} data={this.state.sideBarData} />
          <Slider onChange={this.changeDate} />
          <Main onChange={this.changePage} />
        </div>
      </div>
    );
  }
}

export default App;
