import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getStocks } from '../actions';
import parse from 'url-parse';
import serialize from 'form-serialize';

class DatePickerContainer extends Component {
  constructor() {
    super();
    //this.props.getStocks = this.getStocks.bind(this);
  }

  onSubmit = e => {
    e.preventDefault();
    let date = e.target.date.value.split('-').join('');
    this.setState({
      selectedDate: date
    });

    this.props.getStocks(date);
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

const mapDispatchToProps = dispatch => {
  return {
    getStocks: date => {
      dispatch(getStocks(date));
    }
  };
};

export default connect(null, mapDispatchToProps)(DatePickerContainer);
