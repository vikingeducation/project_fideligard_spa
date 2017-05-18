import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getInitialStocks } from "../actions";
import Table from "../components/table";

class StockPriceWindowContainer extends Component {
  componentDidMount() {
    //  this.props.getInitialStocks();
  }

  render() {
    const { results, isFetching } = this.props;
    return <div />;
  }
}

const mapStateToProps = state => {
  return {
    results: state.results,
    isFetching: state.isFetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getInitialStocks: () => {
      dispatch(getInitialStocks());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  StockPriceWindowContainer
);
