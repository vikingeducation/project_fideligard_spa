import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import parse from "url-parse";
import serialize from "form-serialize";

class DatePickerContainer extends Component {
  constructor() {
    super();
  }
  onSubmit = e => {
    e.preventDefault();
    let date = e.target.date.value.split("-").join("");
    this.setState({
      selectedDate: date
    });
  };
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input type="date" name="date" />
        <input type="submit" />
      </form>
    );
  }
}

export default DatePickerContainer;
