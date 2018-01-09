import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from "react-router-dom";

class StockPanel extends Component {
  componentDidMount() {
    this.props.getStockData();
  }

  render() {
    let dateIndex = 100;
    for (let i = 0; i < this.props.stocksArray[0].length; i++) {
      if (this.props.stocksArray[0][i][0] === this.props.date) {
        dateIndex = i;
      }
    }

    let rows = [];
    for (let i = 0; i < this.props.stocks.length; i++) {
      rows.push(
        <tr>
          <th scope="row">{this.props.stocks[i].name}</th>
          <td>{this.props.stocksArray[i][dateIndex][1]}</td>
          <td>{this.props.stocksArray[i][dateIndex - 2][1]}</td>
          <td>{this.props.stocksArray[i][dateIndex - 7][1]}</td>
          <td>{this.props.stocksArray[i][dateIndex - 30][1]}</td>
          <td>
            {" "}
            <NavLink
              exact
              to={`/trade/${this.props.stocks[i].name}`}
              activeClassName="active"
            >
              Trade
            </NavLink>{" "}
          </td>
        </tr>
      );
    }

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">
            Stocks for {this.props.stocksArray[0][dateIndex][0]}
          </h3>
          <div className="rightAlign">
            <label htmlFor="stockFilter">Filter:</label>
            <input type="text" name="stockFilter" />
          </div>
        </div>
        <div className="panel-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Price</th>
                <th>1d</th>
                <th>7d</th>
                <th>30d</th>
                <th>Trade?</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default StockPanel;
