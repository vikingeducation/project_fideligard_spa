import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import RouteSelect from "./RouteSelect";
import Trade from "./Trade";
import Transactions from "./Transactions";
import Portfolio from "./Portfolio";

const Main = ({ onChange, date, symbol }) => {
	const TradeWithProps = () => <Trade date={date} symbol={symbol} />;

	return (
		<div className="routeContainer">
			<Route exact path="/" render={() => <Redirect to="/trade" />} />
			<Route path="/" component={RouteSelect} />
			<Route exact path="/trade" render={TradeWithProps} />
			<Route exact path="/transactions" component={Transactions} />
			<Route exact path="/portfolio" component={Portfolio} />
		</div>
	);
};

export default Main;
