import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Navbar from "./Navbar";
import StocksContainer from "../containers/StocksContainer";
import Dashboard from "./Dashboard";
import Transactions from "./Transactions";
import TradeContainer from "../containers/TradeContainer";
import Portfolio from "./Portfolio";
import DateSliderContainer from "../containers/DateSliderContainer";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <div className="container-fluid">
            <div className="row">
              <StocksContainer />

              <main className="col-sm-8 offset-sm-4 col-md-8 offset-md-4 pt-3">
                <DateSliderContainer />
                <Dashboard>
                  <Switch>
                    <Route path="/transactions" component={Transactions} />
                    <Route path="/portfolio" component={Portfolio} />
                    <Route path="/trade" component={TradeContainer} />
                    <Redirect exact from="/trade" to="/trade?symbol=A" />
                    <Route
                      exact
                      path="/"
                      render={() => <p>Select an Action</p>}
                    />
                    <Route render={() => <h1>Page Not Found</h1>} />
                  </Switch>
                </Dashboard>

              </main>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
