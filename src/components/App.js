import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Navbar from "./Navbar";
import StockContainer from "../containers/StockContainer";
import DateWidget from "./DateWidget";
import TradePanel from "./TradePanel";

const App = ({ onChange }) => (
  <div>
    <Navbar />
    <div>
      <div className="row">
        <div className="col">
          <StockContainer />
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
