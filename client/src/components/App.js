import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  getApiData,
  getTodaySuccess,
  getYesterSuccess,
  getWeekAgoSuccess,
  getMonthAgoSuccess
} from "../actions";
import { previousDate } from "../helpers/helper";
import JumbotronFluid from "./elements/JumbotronFluid";
import HomeContainer from "../containers/HomeContainer";

class App extends Component {
  componentWillMount() {
    const thisDate = new Date();

    this.props.getData(previousDate(thisDate, 0), getTodaySuccess);
    this.props.getData(previousDate(thisDate, 1), getYesterSuccess);
    this.props.getData(previousDate(thisDate, 7), getWeekAgoSuccess);
    this.props.getData(previousDate(thisDate, 30), getMonthAgoSuccess);
  }
  componentDidMount() {
    console.log("RERER", this.props.todayStocks);
  }
  render() {
    return (
      <Router>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <header className="App-header">
                <JumbotronFluid
                  lead={"Fideligard Historical Portfolio Simulator"}
                />
              </header>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <Switch>
                <Route exact path="/" component={HomeContainer} />
                <Route path="/" render={() => <p>ERR</p>} />
              </Switch>
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
    monthStocks: state.monthStocks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getData: (date, callBack) => {
      dispatch(getApiData("WIKI", "PRICES", date, callBack));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
