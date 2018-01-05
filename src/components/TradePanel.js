import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

const TradePanel = () => (
  <div className="panel">
    <div className="row">
      <h2>Trade</h2>
      <div className="rightAlign">
        <select name="panel-select">
          <option value="tradePanel">Trade</option>
          <option value="portfolioPanel">Portfolio</option>
          <option value="transactionsPanel">Transactions</option>
        </select>
      </div>
    </div>
    <div className="row">
      <div className="col-xs-6">
        <p>Symbol:</p>
        <div className="input-group">
          <form>
            <label htmlFor="buy-sell">Buy/Sell:</label>
            <select name="buy-sell" className="form-control" placeholder="buy">
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
            <label htmlFor="quantity">Quantity:</label>
            <input type="text" name="quantity" className="form-control" />
            <p>Date:</p>
            <p>1/5/2018</p>
            <p>$100.00</p>
            <p>$1,000.00</p>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="col-xs-6">
        <p>Cash Available:</p>
        <p>$100,000</p>
        <br />
        <p>Order Status:</p>
        <p className="status-color">VALID</p>
      </div>
    </div>
  </div>
);

export default TradePanel;
