import React, { Component } from "react";
import { connect } from "react-redux";
import App from "../components/App";
import serialize from "form-serialize";
import { getStockData } from "../actions";

class AppContainer extends Component {
  componentDidMount() {
    this.props.getStockData();
  }

  render() {
    return (
      <div>
        <App />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    stocks: state.stocks.stocksArray
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getStockData: () => {
      dispatch(getStockData("AAPL"));
    }
  };
};

const AppContainerConnected = connect(mapStateToProps, mapDispatchToProps)(
  AppContainer
);
export default AppContainerConnected;
