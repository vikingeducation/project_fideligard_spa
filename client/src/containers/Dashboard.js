import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/stockActions';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
// import Portfolio from '../components/Portfolio';
// import Trades from '../components/Trades';
// import Transactions from '../../components/Transactions';
import Stocks from '../components/Stocks';
import Handle from '../components/Handle';
import Slider from 'rc-slider';

class Dashboard extends Component {
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-4">
						<Stocks />
					</div>
					<div className="col-md-4">
						<Slider min={0} max={20} defaultValue={3} handle={Handle} />
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, null)(Dashboard);
