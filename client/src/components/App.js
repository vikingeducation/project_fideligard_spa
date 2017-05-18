import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "../components/Navbar";
import Dropdown from "../components/dropdown";
import StockPriceWindowContainer from "../containers/StockPriceWindowContainer";
import DatePickerContainer from "../containers/DatePickerContainer";
import MainPanelContainer from "../containers/MainPanelContainer";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Navbar />
          <MainPanelContainer />
          <DatePickerContainer />
          <StockPriceWindowContainer />
          <Switch>
            <Route exact path="/" render={() => <h1>Portfolio</h1>} />
            <Route exact path="/trade" render={() => <h1>trade</h1>} />
            <Route
              exact
              path="/transactions"
              render={() => <h1>transactions</h1>}
            />
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
