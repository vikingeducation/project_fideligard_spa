import React from "react";
import Table from "./Table";

export const Sidebar = ({ columnNames, data }) => {
	return (
		<div>
			<div>
				<h2>Stocks</h2>
				<label htmlFor="stockFilter">Filter</label>
				<input type="text" name="stockFilter" />
			</div>
			<div>
				<Table columnNames={columnNames} data={data} />
			</div>
		</div>
	);
};
