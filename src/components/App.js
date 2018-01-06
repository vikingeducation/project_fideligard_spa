import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Navbar from "./Navbar";
import StockPanel from "./StockPanel";
import DateWidget from "./DateWidget";
import TradePanel from "./TradePanel";

const App = ({ onChange, data }) => (
  <div>
    <Navbar />
    <div>
      <div className="row">
        <div className="col">
          <StockPanel data={data} />
        </div>
        <div className="col">
          <DateWidget onChange={onChange} />
          <TradePanel />
        </div>
      </div>
    </div>
  </div>
);

export default App;
