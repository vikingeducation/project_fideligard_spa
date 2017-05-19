import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "../components/Navbar";
import StockPriceWindowContainer from "../containers/StockPriceWindowContainer";
import DatePickerContainer from "../containers/DatePickerContainer";
import TradeContainer from "../containers/TradeContainer";
import ProfileContainer from "../containers/ProfileContainer";
import TransactionContainer from "../containers/TransactionContainer";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Navbar />
          <DatePickerContainer />
          <div className="row">
            <StockPriceWindowContainer />
            <Switch>
              <Route exact path="/" component={ProfileContainer} />
              <Route path="/portfolio" component={ProfileContainer} />
              <Route path="/trade" component={TradeContainer} />
              <Route path="/transactions" component={TransactionContainer} />
              <Route render={() => <h1>Page not found</h1>} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
