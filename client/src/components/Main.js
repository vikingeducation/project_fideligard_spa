import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Trades from "./Trades";
import Transactions from "./Transactions";
import Portfolio from "./Portfolio";

const Main = props => {
	return (
		<Router>
			<div className="routeContainer">
				<Route exact path="/trades" component={Trades} />
				<Route exact path="/transactions" component={Transactions} />
				<Route exact path="/portfolio" component={Portfolio} />
			</div>
		</Router>
	);
};

export default Main;
