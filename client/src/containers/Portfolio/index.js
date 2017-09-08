import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './Portfolio.css';
import Actions from './actions';

import './Portfolio.css';
import Portfolio from '../../components/Portfolio';

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ ...Actions.RangeSliderActions }, dispatch)
});

export default connect(state => state, mapDispatchToProps)(Portfolio);
