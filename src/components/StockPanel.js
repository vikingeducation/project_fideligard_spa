import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

const StockPanel = ({ data }) => {
  console.log(data);
  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title">Stocks</h3>
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
          <tbody>
            <tr>
              <th scope="row">{data.stocks[0]}</th>
              <td>{data.stocksArray[0][data.stocksArray[0].length - 1][1]}</td>
              <td>{data.stocksArray[0][data.stocksArray[0].length - 2][1]}</td>
              <td>{data.stocksArray[0][data.stocksArray[0].length - 7][1]}</td>
              <td>{data.stocksArray[0][data.stocksArray[0].length - 30][1]}</td>
              <td>Trade</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockPanel;
