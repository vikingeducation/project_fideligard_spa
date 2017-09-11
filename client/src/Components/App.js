import React, { Component } from "react";
import { connect } from "react-redux";

//ROUTING
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavLink } from "react-router-dom";
import DateSlider from "./elements/DateSlider";
import NavLinks from "./NavLinks";

//NAVBAR
import Navbar from "./elements/Navbar";
//Portfolio, trade, transaction, homescreen
import HomeScreen from "./HomeScreen";
import Portfolio from "./Portfolio";
import Trade from "./Trade";
import Transactions from "./Transactions";

import StockContainer from "../Containers/StocksContainer";

class App extends Component {
  constructor(props) {
    super(props);
    this.selectDate = this.selectDate.bind(this);
    this.state = {
      selectedDate: "2016-01-01"
    };
  }
  selectDate = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    return (
      <div className="App">
        <Router>
          <div className="container-fluid">
            {/*TOP OF PAGE  */}
            <Navbar />
            <h1>Stock Portfolio App</h1>
            <div className="row">
              {/* left panel */}
              <div className="col-5">
                <StockContainer date={this.state.selectedDate} />
              </div>

              {/* right panel */}
              <div className="col-7">
                <div className="row">
                  <DateSlider
                    selectedDate={this.state.selectedDate}
                    name="selectedDate"
                    id="dateSlider"
                    onChange={this.selectDate}
                  />
                  <NavLinks />
                </div>
                <div className="row">
                  <Switch>
                    <Route exact path="/Portfolio" component={Portfolio} />
                    <Route
                      exact
                      path="/Transactions"
                      component={Transactions}
                    />
                    <Route exact path="/Trade" component={Trade} />
                    <Route exact path="/" component={HomeScreen} />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
//
// const mapStateToProps = state => {
//   console.log("state in appContainer = ", state);
//   return {
//     // ...state,
//     // stocks: state.stocks.stocks,
//     // isFetching: state.stocks.isFetching,
//     // error: state.stocks.error
//   };
// };
// const mapDispatchToProps = dispatch => {
//   return {};
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(App);
