import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { getApiData, setDate } from "../actions";
import { previousDate, apiDate, inputDate } from "../helpers/helper";
import JumbotronFluid from "./elements/JumbotronFluid";
import Input from "./elements/Input";

import StocksContainer from "../containers/StocksContainer";
import PortfolioContainer from "../containers/PortfolioContainer";
import TradeContainer from "../containers/TradeContainer";
import TransactionContainer from "../containers/TransactionContainer";

class App extends Component {
  componentWillMount() {
    this.props.setDateData(apiDate(new Date()), {});
  }

  render() {
    return (
      <Router>
        <div className="container-fluid">
          <header className="App-header">
            <JumbotronFluid
              lead={"Fideligard Historical Portfolio Simulator"}
            />
          </header>
          <div>
            <div className="row">
              <div className="col">
                <div className="container-fluid">
                  <Input
                    type="date"
                    onChange={e => {
                      let date = new Date(e.target.value);

                      date.setDate(date.getDate() + 1);
                      this.props.setDateData(date, this.props.stocks);
                    }}
                    value={inputDate(this.props.todaysDate)}
                  />
                  <StocksContainer />
                </div>
              </div>
              <div className="col">
                <Switch>
                  <Route
                    exact
                    path="/transactions"
                    component={TransactionContainer}
                  />
                  <Route
                    exact
                    path="/trade/:symbol/:date/:price/"
                    component={TradeContainer}
                  />
                  <Route exact path="/trade" component={TradeContainer} />
                  <Route exact path="/" component={PortfolioContainer} />
                  <Route path="/" render={() => <p>ERR</p>} />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    stocks: state.stocks,
    todaysDate: state.todaysDate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setDateData: (date, stocks) => {
      dispatch(setDate(date));
      dispatch(getApiData(previousDate(date, 0), stocks));

      dispatch(getApiData(previousDate(date, 1), stocks));

      dispatch(getApiData(previousDate(date, 7), stocks));

      dispatch(getApiData(previousDate(date, 30), stocks));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
