import React, { Component } from "react";
import { connect } from "react-redux";
import App from "../components/App";
import serialize from "form-serialize";
import { getStockData } from "../actions";

class AppContainer extends Component {
  constructor() {
    super();
    this.state = {
      date: "2018-01-04"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.getStockData();
  }

  handleChange(event) {
    this.setState({ date: event.target.value });
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <App onChange={this.handleChange} />
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
