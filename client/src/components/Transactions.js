import React from "react";
import Table from "./Table";

const Transactions = ({ data }) => {
	const columns = ["Date", "Symbol", "Type", "Quantity", "Price"];
	return (
		<div>
			<Table columnNames={columns} data={data} />
		</div>
	);
};

export default Transactions;
