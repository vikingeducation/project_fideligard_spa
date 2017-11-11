import React, { Component } from "react";
import { connect } from "react-redux";
import Stock from "../components/Stock";
import StockHeader from "../components/StockHeader";
import { sanitizeStocks, dateDifference } from "../helpers/helper";

const StocksContainer = ({
  isFetching,
  monthStocks,
  weekStocks,
  yesterStocks,
  todayStocks
}) => {
  let stockRows;
  let combinedStocks = [];
  if (
    todayStocks.data &&
    monthStocks.data &&
    weekStocks.data &&
    yesterStocks.data
  ) {
    combinedStocks = sanitizeStocks(
      todayStocks.data,
      monthStocks.data,
      weekStocks.data,
      yesterStocks.data
    );
    stockRows = combinedStocks.map((tStock, index) => (
      <Stock
        todayStock={combinedStocks[index][0]}
        yesterStock={combinedStocks[index][1]}
        weekStock={combinedStocks[index][2]}
        monthStock={combinedStocks[index][3]}
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
            <StockHeader stocks={combinedStocks.length ? combinedStocks : ""} />
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
