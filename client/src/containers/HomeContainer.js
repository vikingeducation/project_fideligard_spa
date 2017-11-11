import React, { Component } from "react";
import { connect } from "react-redux";
import StocksContainer from "./StocksContainer";

class HomeContainer extends Component {
  render() {
    return (
      <div>
        <p>
          01-01-2016<input type="range" />11-10-2017
        </p>
        <p>To get started...</p>
        {this.props.isFetching ? (
          <span>Loading</span>
        ) : this.props.todayStocks ? (
          <StocksContainer
            todayStocks={this.props.todayStocks}
            yesterStocks={this.props.yesterStocks}
            weekStocks={this.props.weekStocks}
            monthStocks={this.props.monthStocks}
            isFetching={this.props.isFetching}
          />
        ) : (
          <span>Still Loading...</span>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("state", state);
  return {
    todayStocks: state.todayStocks,
    yesterStocks: state.yesterStocks,
    weekStocks: state.weekStocks,
    monthStocks: state.monthStocks,
    isFetching: state.isFetching
  };
};

export default connect(mapStateToProps)(HomeContainer);
