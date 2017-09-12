import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './App.css';
import Actions from './actions';
import App from '../../components/App';

// const mapDispatchToProps = dispatch => ({
// 	actions: bindActionCreators(
// 		{ ...Actions.RangeSliderActions, ...Actions.PortfolioActions },
// 		dispatch
// 	)
// });

export default connect(state => state, null)(App);
