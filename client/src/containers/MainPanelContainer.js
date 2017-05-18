import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Dropdown from '../components/dropdown';

class MainPanelContainer extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }
  onChange = e => {
    console.log(e.target.value);
    let page = e.target.value;
    if (page != 'select') {
      this.props.history.push(page);
    }
  };

  render() {
    return (
      <div>
        <Dropdown onChange={this.onChange} />
      </div>
    );
  }
}

export default withRouter(MainPanelContainer);
