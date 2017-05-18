import React, { Component } from 'react';
import { connect } from 'react-redux';

class Filter extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }

  onChange = e => {
    let searchTerm = e.target.value;

    this.setState({
      searchTerm
    });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          onChange={this.onChange}
          placeholder="Filter stocks"
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchTerm: this.state.searchTerm
  };
};

export default Filter;
