import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Navbar from "./Navbar";
import StockContainer from "../containers/StockContainer";
import DateWidget from "./DateWidget";
import TradePanel from "./TradePanel";

const App = () => (
  <div>
    <Navbar />
    <div>
      <div className="row">
        <div className="col-xs-4">
          <StockContainer />
        </div>
        <div className="col-xs-8">
          <DateWidget />
          <TradePanel />
        </div>
      </div>
    </div>
  </div>
);

export default App;
