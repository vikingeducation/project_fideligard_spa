import React from "react";
import { Link } from "react-router-dom";
import Table from "./Table";

const Sidebar = ({ data, onClick }) => {
	const columns = ["Symbol", "Price", "1 Day", "7 Day", "30 Day", "Trade?"];
	let dataWithLink = data;

	if (data.length && data[0].length !== columns.length) {
		dataWithLink = data.map(row => {
			row.push(
				<Link to="/trade" onClick={() => onClick(row[0], row[1])}>
					trade
				</Link>
			);

			return row;
		});
	}

	return (
		<div className="sidebar">
			<div>
				<h2>Stocks</h2>
				<label htmlFor="stockFilter">Filter</label>
				<input type="text" name="stockFilter" />
			</div>
			<div>
				<Table columnNames={columns} data={dataWithLink} onClick={onClick} />
			</div>
		</div>
	);
};

export default Sidebar;
