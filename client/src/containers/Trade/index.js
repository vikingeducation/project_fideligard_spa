import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './Trade.css';
import Actions from './actions';

import Trade from '../../components/Trade';

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ ...Actions.PortfolioActions }, dispatch)
});

export default connect(state => state, mapDispatchToProps)(Trade);
