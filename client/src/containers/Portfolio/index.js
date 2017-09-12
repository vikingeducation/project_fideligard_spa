import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './Portfolio.css';

import Portfolio from '../../components/Portfolio';

export default connect(state => state, null)(Portfolio);
