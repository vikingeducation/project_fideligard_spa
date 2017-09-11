import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Title } from "./components/Navbar";
import SliderContainer from "./containers/SliderContainer";
import SidebarContainer from "./containers/SidebarContainer";
import TradesContainer from "./containers/TradesContainer";
import TransactionsContainer from "./containers/TransactionsContainer";
import Portfolio from "./components/Portfolio";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Title />
        <div className="App">
          <SidebarContainer />
          <div className="rightSide">
            <SliderContainer />
            <BrowserRouter>
              <div className="routeContainer">
                <Route exact path="/" component={TradesContainer} />
                <Route exact path="/trades" component={TradesContainer} />
                <Route
                  exact
                  path="/transactions"
                  component={TransactionsContainer}
                />
                <Route exact path="/portfolio" component={Portfolio} />
              </div>
            </BrowserRouter>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
