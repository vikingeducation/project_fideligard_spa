import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as stockActions from '../actions/stockActions';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class App extends Component {

  componentDidMount () {
    if(!this.props.stockReducer.stocks.length) {
      this.props.actions.getStocks();
    }
  }


  render() {
    console.log("App.js line 18 ",this.props)
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(stockActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
