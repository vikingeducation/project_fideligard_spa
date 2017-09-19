import React from "react";
import { Route, Redirect } from "react-router-dom";
import RouteSelect from "./RouteSelect";
import Trade from "./Trade";
import Transactions from "./Transactions";
import Portfolio from "./Portfolio";

const Main = ({
	onChange,
	date,
	symbol,
	transactionData,
	balance,
	price,
	changeQuantity,
	total,
	onSubmit
}) => {
	const TradeWithProps = () => (
		<Trade
			date={date}
			symbol={symbol}
			balance={balance}
			price={price}
			total={total}
			changeQuantity={changeQuantity}
			onSubmit={onSubmit}
		/>
	);
	const TransactionsWithProps = () => <Transactions data={transactionData} />;

	return (
		<div className="routeContainer">
			<Route exact path="/" render={() => <Redirect to="/trade" />} />
			<Route path="/" component={RouteSelect} />
			<Route exact path="/trade" render={TradeWithProps} />
			<Route exact path="/transactions" render={TransactionsWithProps} />
			<Route exact path="/portfolio" component={Portfolio} />
		</div>
	);
};

export default Main;
