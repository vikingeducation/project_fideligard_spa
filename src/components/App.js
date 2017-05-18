import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from "react-router-dom";
import Navbar from "./Navbar";
import Stocks from "./Stocks";
import Dashboard from "./Dashboard";
import Transactions from "./Transactions";
import Trade from "./Trade";
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
              <Stocks />

              <main className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
                <DateSliderContainer />
                <Dashboard>
                  <Switch>
                    <Route path="/trade" component={Trade} />
                    <Route path="/transactions" component={Transactions} />
                    <Route path="/portfolio" component={Portfolio} />
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
