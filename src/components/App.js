import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "./Navbar";
import StockPanel from "./StockPanel";
import DateWidget from "./DateWidget";
import TradePanel from "./TradePanel";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div>
          <div className="row">
            <div className="col-xs-4 table-margin-right">
              <StockPanel />
            </div>
            <div className="col-xs-8">
              <DateWidget />
              <TradePanel />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
