import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createBrowserHistory as history } from "history";
import RouteSelect from "./RouteSelect";
import Trades from "./Trades";
import Transactions from "./Transactions";
import Portfolio from "./Portfolio";

const Main = ({ onChange }) => {
	return (
		<Router>
			<div className="routeContainer">
				<Route path="/" component={RouteSelect} />
				<Route exact path="/trades" component={Trades} />
				<Route exact path="/transactions" component={Transactions} />
				<Route exact path="/portfolio" component={Portfolio} />
			</div>
		</Router>
	);
};

export default Main;
