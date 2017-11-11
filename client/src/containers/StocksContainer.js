import React, { Component } from "react";
import { connect } from "react-redux";
import Stock from "../components/Stock";
import { sanitizeStocks } from "../helpers/helper";

const StocksContainer = ({
  isFetching,
  monthStocks,
  weekStocks,
  yesterStocks,
  todayStocks
}) => {
  let stockRows;
  if (
    todayStocks.data &&
    monthStocks.data &&
    weekStocks.data &&
    yesterStocks.data
  ) {
    let combinedStocks = sanitizeStocks(
      todayStocks.data,
      monthStocks.data,
      weekStocks.data,
      yesterStocks.data
    );
    stockRows = todayStocks.data.map((tStock, index) => (
      <Stock
        yesterStock={
          yesterStocks.data[index] ? yesterStocks.data[index] : [0, 0, 0]
        }
        weekStock={weekStocks.data[index] ? weekStocks.data[index] : [0, 0, 0]}
        monthStock={
          monthStocks.data[index] ? monthStocks.data[index] : [0, 0, 0]
        }
        singleStock={tStock ? tStock : [0, 0, 0]}
      />
    ));
  } else {
    stockRows = (
      <tr>
        <td>Loading Some More</td>
      </tr>
    );
  }

  //   { key1: value1, key2: value2 }
  // obj = _
  // obj[key1]
  // stock_data = { "A": { prices: { "20170929": "64.5", "20171109": "65.8"},
  // "B": { prices: { "20171109": "70" }}

  return (
    <span>
      {isFetching ? (
        <span>Loading</span>
      ) : todayStocks ? (
        <table className="table-bordered">
          <thead>
            <tr>
              <th>Today</th>
              <th>1 D</th>
              <th>7 D</th>
              <th>30 D</th>
            </tr>
          </thead>
          <tbody>{stockRows}</tbody>
        </table>
      ) : (
        <span>Still Loading...</span>
      )}
    </span>
  );
};

const mapStateToProps = state => {
  console.log("state", state);
  return {
    todayStocks: state.todayStocks,
    yesterStocks: state.yesterStocks,
    weekStocks: state.weekStocks,
    monthStocks: state.monthStocks,
    isFetching: state.isFetching
  };
};

export default connect(mapStateToProps)(StocksContainer);
