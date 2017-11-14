import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  getApiData,
  getTodaySuccess,
  getYesterSuccess,
  getWeekAgoSuccess,
  getMonthAgoSuccess,
  setDate
} from "../actions";
import { previousDate, displayDate } from "../helpers/helper";
import JumbotronFluid from "./elements/JumbotronFluid";
import Slider from "./elements/Slider";

import StocksContainer from "../containers/StocksContainer";
import PortfolioContainer from "../containers/PortfolioContainer";
import TradeContainer from "../containers/TradeContainer";
import TransactionContainer from "../containers/TransactionContainer";

class App extends Component {
  componentWillMount() {
    this.props.setDateData(new Date());

    this.props.getData(previousDate(this.props.todaysDate, 0), getTodaySuccess);
    this.props.getData(
      previousDate(this.props.todaysDate, 1),
      getYesterSuccess
    );
    this.props.getData(
      previousDate(this.props.todaysDate, 7),
      getWeekAgoSuccess
    );
    this.props.getData(
      previousDate(this.props.todaysDate, 30),
      getMonthAgoSuccess
    );
  }
  render() {
    return (
      <Router>
        <div>
          <header className="App-header">
            <JumbotronFluid
              lead={"Fideligard Historical Portfolio Simulator"}
            />
          </header>
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-6">
                <StocksContainer />
              </div>
              <div className="col-sm-6">
                <Slider
                  endDate={new Date()}
                  startDate={new Date("10-30-2017")}
                  onChange={e => this.props.setDateData(Number(e.target.value))}
                  value={this.props.todaysDate}
                  label={displayDate(this.props.todaysDate)}
                />

                <Switch>
                  <Route
                    exact
                    path="/transactions"
                    component={TransactionContainer}
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
    todayStocks: state.todayStocks,
    yesterStocks: state.yesterStocks,
    weekStocks: state.weekStocks,
    monthStocks: state.monthStocks,
    todaysDate: state.todaysDate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getData: (date, callBack) => {
      dispatch(getApiData("WIKI", "PRICES", date, callBack));
    },
    setDateData: date => {
      dispatch(setDate(date));
      dispatch(
        getApiData("WIKI", "PRICES", previousDate(date, 0), getTodaySuccess)
      );
      dispatch(
        getApiData("WIKI", "PRICES", previousDate(date, 1), getYesterSuccess)
      );
      dispatch(
        getApiData("WIKI", "PRICES", previousDate(date, 7), getWeekAgoSuccess)
      );
      dispatch(
        getApiData("WIKI", "PRICES", previousDate(date, 30), getMonthAgoSuccess)
      );
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
