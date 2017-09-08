import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as stockActions from '../actions/stockActions';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Dashboard from './Dashboard';
import Header from '../components/Header';

class App extends Component {
  componentDidMount() {
    if (!this.props.stockReducer.stocks.length) {
      this.props.actions.getStocks();
    }
  }

  render() {
    return (
      <div className="app">
        <Header />
        <Dashboard />
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(stockActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
