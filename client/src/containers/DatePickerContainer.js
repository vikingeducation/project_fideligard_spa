import React, { Component } from "react";
import { connect } from "react-redux";
import { getStocks, setDate } from "../actions";

class DatePickerContainer extends Component {
  // constructor() {
  //   super();
  // }

  onSubmit = e => {
    e.preventDefault();
    let date = e.target.value.split("-").join("");
    this.props.setDate(date);
    this.props.getStocks(date);
  };

  render() {
    return (
      <form>
        <input onChange={this.onSubmit} type="date" name="date" />
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getStocks: date => {
      dispatch(getStocks(date));
    },
    setDate: date => {
      dispatch(setDate(date));
    }
  };
};

export default connect(null, mapDispatchToProps)(DatePickerContainer);
