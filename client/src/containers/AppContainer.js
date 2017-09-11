import React, { Component } from "react";
import { connect } from "react-redux";
import App from "../App.js";
import { getStocks, setDate, setSidebarData, updateSidebar } from "../actions";

class AppContainer extends Component {
  componentDidMount = async () => {
    await Promise.resolve(this.props.getStocks());
    this.props.updateSidebar(
      this.props.stockData[this.props.date],
      this.props.stockData,
      this.props.date
    );
  };

  render() {
    return <App />;
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getStocks: async () => {
      await Promise.resolve(dispatch(getStocks()));
    },
    setDate: e => {
      dispatch(setDate(e.target.value));
    },
    setSidebarData: data => {
      dispatch(setSidebarData(data));
    },
    updateSidebar: (today, stocks, date) => {
      dispatch(updateSidebar(today, stocks, date));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
