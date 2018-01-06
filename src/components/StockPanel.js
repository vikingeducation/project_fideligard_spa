import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

const StockPanel = ({ data }) => {
  console.log("====================");
  console.log(data);
  console.log("====================");

  let dateIndex = 100;
  let rows = [];
  for (let i = 0; i < data.stocks.length; i++) {
    rows.push(
      <tr>
        <th scope="row">{data.stocks[i]}</th>
        <td>{data.stocksArray[i][dateIndex][1]}</td>
        <td>{data.stocksArray[i][dateIndex - 2][1]}</td>
        <td>{data.stocksArray[i][dateIndex - 7][1]}</td>
        <td>{data.stocksArray[i][dateIndex - 30][1]}</td>
        <td>Trade</td>
      </tr>
    );
  }

  // for (let h = 0; h < data.stocksArray[i].length; h++) {
  //   console.log("\\\\\\\\\\\\\\\\\\");
  //   console.log(data.stocksArray[100][0]);
  //   console.log(data.date);
  //   console.log("\\\\\\\\\\\\\\\\\\");
  //   if (data.stocksArray[i][h][0] === data.date) {
  //     dateIndex = h;
  //     console.log("++++++++++++++");
  //     console.log(data.stocksArray[i][0][dateIndex]);
  //   }
  // }

  console.log(rows);

  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title">
          Stocks for {data.stocksArray[0][dateIndex][0]}
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
};

export default StockPanel;
