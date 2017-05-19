import React, { Component } from "react";
import { connect } from "react-redux";
import { setSearchTerm } from "../actions";

class Filter extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }

  onChange = e => {
    let searchTerm = e.target.value;

    this.props.setSearchTerm(searchTerm);

    console.log("this is props for filter", this.props);
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
    searchTerm: state.searchTerm
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSearchTerm: term => {
      dispatch(setSearchTerm(term));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
