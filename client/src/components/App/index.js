import React, { Component } from 'react';
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
// <FAIcon className="icon-btn" icon="user" />
export default class App extends Component {
	render() {
		console.log(this.props);
		return (
			<Router>
				<ScrollToTop>
					<div>
						<Header text="Fideligard Historical Portfolio Simulator" />
						<MainContainer>
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
