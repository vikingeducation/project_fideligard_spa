import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import { getStockData, setStock } from "../actions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setDate } from "../actions";

const DateWidget = ({ handleChange }) => {
  return (
    <div className="panel">
      <label htmlFor="dateSelect">Select a Stock Date:</label>
      <input type="date" name="dateSelect" onChange={handleChange} />
      <div className="panel-body">
        <NavLink exact to="/portfolio" activeClassName="active">
          See Portfolio
        </NavLink>{" "}
        <NavLink exact to="/transactions" activeClassName="active">
          / See Transactions
        </NavLink>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleChange: event => {
      dispatch(setDate(event.target.value));
    }
  };
};

const DateWidgetContainer = withRouter(
  connect(null, mapDispatchToProps)(DateWidget)
);

export default DateWidgetContainer;
