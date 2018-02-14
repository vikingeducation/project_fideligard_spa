import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  getApiData,
  getStockSuccess,
  setDate,
  clearTransactionTrade
} from "../actions";
import { previousDate, displayDate } from "../helpers/helper";
import JumbotronFluid from "./elements/JumbotronFluid";
import Slider from "./elements/Slider";

import StocksContainer from "../containers/StocksContainer";
import PortfolioContainer from "../containers/PortfolioContainer";
import TradeContainer from "../containers/TradeContainer";
import TransactionContainer from "../containers/TransactionContainer";
// import todayResponse from "../apiCalls/2017-11-14";
// import yesterdayResponse from "../apiCalls/2017-11-13";
// import weekResponse from "../apiCalls/2017-11-7";
// import monthResponse from "../apiCalls/2017-10-16";

class App extends Component {
  componentWillMount() {
    this.props.setDateData(new Date(), {});
  }

  onSliderChange = e => {
    let date = e.target.value.split("-");
    //2018-01-01 => 2018-1-1
    if (date[1][0] === "0") {
      date[1] = date[1][1];
    }
    if (date[2][0] === "0") {
      date[2] = date[2][1];
    }
    date = date.join("-");
    this.props.setDateData(date, this.props.stocks);
  };

  render() {
    let twoMonthsPrior = new Date();
    twoMonthsPrior.setMonth(twoMonthsPrior.getMonth() - 2);
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
                <p>{displayDate(this.props.todaysDate)}</p>

                <Slider
                  onChange={this.onSliderChange.bind(this)}
                  value={this.props.todaysDate}
                />

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
    getData: date => {
      dispatch(getApiData("WIKI", "PRICES", date));
    },
    setDateData: (date, stocks) => {
      dispatch(setDate(date));
      dispatch(getApiData(previousDate(date, 0), stocks));

      dispatch(getApiData(previousDate(date, 1), stocks));

      dispatch(getApiData(previousDate(date, 7), stocks));

      dispatch(getApiData(previousDate(date, 30), stocks));

      dispatch(clearTransactionTrade());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
