import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

const StockPanel = () => (
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
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>blah</td>
            <td>blah</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default StockPanel;
