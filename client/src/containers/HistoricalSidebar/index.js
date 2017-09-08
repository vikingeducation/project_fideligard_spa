import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './HistoricalSidebar.css';
import Actions from './actions';

import './HistoricalSidebar.css';
import HistoricalSidebar from '../../components/HistoricalSidebar';

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ ...Actions.RangeSliderActions }, dispatch)
});

export default connect(state => state, mapDispatchToProps)(HistoricalSidebar);
