import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Slider } from "./components/Slider";
import { Sidebar } from "./components/Sidebar";
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
      row.push(this.parseDate(date, 1));
      row.push(this.parseDate(date, 7));
      row.push(this.parseDate(date, 30));
      row.push(`<Link path=/path/${row[0]}>trade</Link>`);
    });
  };

  parseDate = (date, difference) => {
    let newdate = new Date(date);
    newdate.setDate(newdate.getDate() - difference);
    return newdate.toISOString().split("T")[0];
  };

  render() {
    console.log(this.props);
    return (
      <div className="App">
        <Navbar />
        <Slider />
        <Sidebar columnNames={sidebarColumns} data={this.state.sideBarData} />
        <BrowserRouter />
      </div>
    );
  }
}

export default App;
