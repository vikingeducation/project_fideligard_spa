import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const dropdown = () => {
  return (
    <div className="dropdown">
      <button
        className="btn btn-default dropdown-toggle"
        type="button"
        id="dropdownMenu1"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="true"
      >
        Select Page
        <span className="caret" />
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
        <li><Link to="/portfolio">Portfolio</Link></li>
        <li><Link to="/transactions">Transactions</Link></li>
        <li><Link to="/trade">Trade</Link></li>

      </ul>
    </div>
  );
};

class MainPanelContainer extends Component {
  render() {
    <div>
      {dropdown}

    </div>;
  }
}

export default MainPanelContainer;
