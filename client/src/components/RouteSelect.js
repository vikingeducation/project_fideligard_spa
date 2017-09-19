import React from "react";

const RouteSelect = ({ location, history }) => {
	const title =
		location.pathname.length > 1
			? location.pathname
					.slice(1)[0]
					.toUpperCase()
					.concat(location.pathname.slice(2))
			: null;
	return (
		<div className="main-header">
			<h2>{title}</h2>
			<select
				onChange={e => {
					history.push(`/${e.target.value}`);
				}}
			>
				<option value="trade" defaultValue>
					Trade
				</option>
				<option value="portfolio">Portfolio</option>
				<option value="transactions">Transactions</option>
			</select>
		</div>
	);
};

export default RouteSelect;
