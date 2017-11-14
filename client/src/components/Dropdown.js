import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class Dropdown extends Component {
  render() {
    const { src, history, location } = this.props;
    console.log(this.props);
    let options = src.map(item => {
      if (item.url === location.pathname) {
        return (
          <option value={item.url} selected>
            {item.label}
          </option>
        );
      }
      return <option value={item.url}>{item.label}</option>;
    });

    return (
      <select
        onChange={e => {
          history.push(e.target.value);
        }}
      >
        {options}
      </select>
    );
  }
}

Dropdown.propTypes = {
  src: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    src: state.dropdownPaths
  };
};

export default withRouter(connect(mapStateToProps)(Dropdown));
