import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class Dropdown extends Component {
  render() {
    const { src, history, location } = this.props;
    let options = src.map(item => {
      return (
        <option key={item.url} value={item.url}>
          {item.label}
        </option>
      );
    });
    //filter out everything after 2nd / = /trade/a/123 => /trade
    let defValu = location.pathname.match(/\/\w+\//g);
    if (!!defValu) {
      defValu = defValu[0].substring(0, defValu[0].length - 1);
    } else {
      defValu = location.pathname;
    }
    return (
      <select
        onChange={e => {
          history.push(e.target.value);
        }}
        defaultValue={defValu}
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
