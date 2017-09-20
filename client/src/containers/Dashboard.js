import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/stockActions';
//import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import MainBodyContainer from './MainBodyContainer.js'
import Stocks from '../components/Stocks';

import '../index.css'

class Dashboard extends Component {
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-xs-4" id='leftcontent'>
						<Stocks stocks={this.props.stocks} onFilterChange={this.props.onFilterChange} filterText={this.props.filterText}/>
					</div>
					<div className="col-xs-4" id='rightcontent'>
						<form>
						  <div>
						    <label htmlFor="datePicker">Choose a date to display stock prices:</label>
						    <input type="date" id="datePicker" name="datePicker" min="2016-01-01" max="2016-12-30" onChange={this.props.onDateChange}/>
						  </div>
						</form>
						<MainBodyContainer />
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps, null)(Dashboard));
						// <Slider min={0} max={20} defaultValue={3} handle={Handle} />