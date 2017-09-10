import React, { Component } from "react";

//ROUTING
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavLink } from "react-router-dom";
import NavLinks from "./NavLinks";

//NAVBAR
import Navbar from "./elements/Navbar";
//Portfolio, trade, transaction
import Portfolio from "./Portfolio";
import Trade from "./Trade";
import Transactions from "./Transactions";

import StockContainer from "../Containers/StocksContainer";
<<<<<<< HEAD
=======
import NavLinks from "./NavLinks";
>>>>>>> stocks

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div className="container-fluid">
            {/* make a nav bar */}
            <Navbar />
            <h1>Stock Portfolio App</h1>
            {/* move navlinks later */}
            <div className="row">
              <div className="col-5">
                <StockContainer />
              </div>
              <div className="col-7">
                <NavLinks />
                <Switch>
                  <Route exact path="/Portfolio" component={Portfolio} />
                  <Route exact path="/Transactions" component={Transactions} />
                  <Route exact path="/Trade" component={Trade} />
                </Switch>
              </div>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
