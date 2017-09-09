import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import {
	BrowserRouter as Router,
	withRouter,
	Route,
	NavLink,
	Switch
} from 'react-router-dom';
import ScrollToTop from '../ScrollToTop';
import Header from '../Header';
import { NavLinks, MainContainer } from './wrappers';
import Portfolio from '../../containers/Portfolio';
import store from '../../store';
import * as Actions from '../../components/HistoricalSidebar/actions';
// <FAIcon className="icon-btn" icon="user" />
//
export default class App extends Component {
	constructor(props) {
		super(props);
		this.socket = openSocket('http://localhost:3001');
		this.socket.on(Actions.GET_SUCCESS_HISTORICAL_DATA, data => {
			store.dispatch(Actions.getSuccessHistoricalData(data));
		});

		this.socket.on(Actions.GET_FAILURE_HISTORICAL_DATA, err => {
			store.dispatch(Actions.getFailureHistoricalData(err));
		});
	}

	render() {
		// console.log(this.props);
		return (
			<Router>
				<ScrollToTop>
					<div>
						<Header text="Fideligard Historical Portfolio Simulator" />
						<MainContainer socket={this.socket}>
							<Switch>
								<Route exact path="/" component={Portfolio} />
							</Switch>
						</MainContainer>
					</div>
				</ScrollToTop>
			</Router>
		);
	}
}

// <Route
//MainContainer // 	exact
// 	path="/planets"
// 	render={rProps => <PlanetsHome {...rProps} {...this.props} />}
// />
// <Route
// 	exact
// 	path="/planets/:id"
// 	render={rProps => <PlanetView {...rProps} {...this.props} />}
// />
// <Route
// 	exact
// 	path="/people"
// 	render={rProps => <PeopleHome {...this.props} />}
// />
// <Route
// 	exact
// 	path="/people/:id"
// 	render={rProps => <PersonView {...this.props} />}
// />
