import React from "react";

const RouteSelect = ({ history }) => {
	return (
		<div className="main-header">
			<h2>Trade</h2>
			<select
				onChange={e => {
					history.push(`/${e.target.value}`);
				}}
			>
				<option value="trades" selected>
					Trade
				</option>
				<option value="portfolio">Portfolio</option>
				<option value="transactions">Transactions</option>
			</select>
		</div>
	);
};

export default RouteSelect;
