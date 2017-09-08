import React, { Component } from "react";
import { connect } from "react-redux";
import App from "../App.js";
import { getStocks } from "../actions";

class AppContainer extends Component {
  componentDidMount() {
    this.props.getStocks();
  }

  render() {
    return <App />;
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    getStocks: () => {
      dispatch(getStocks());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
