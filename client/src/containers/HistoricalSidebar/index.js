import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './HistoricalSidebar.css';
import Actions from '../App/actions';

import HistoricalSidebar from '../../components/HistoricalSidebar';

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ ...Actions.HistoricalSidebarActions }, dispatch)
});

export default connect(state => state, mapDispatchToProps)(HistoricalSidebar);
