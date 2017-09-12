import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './Transaction.css';

import Transaction from '../../components/Transaction';

export default connect(state => state, null)(Transaction);
