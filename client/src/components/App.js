import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "../components/Navbar";
import StockPriceWindowContainer from "../containers/StockPriceWindowContainer";
import DatePickerContainer from "../containers/DatePickerContainer";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Navbar />
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
