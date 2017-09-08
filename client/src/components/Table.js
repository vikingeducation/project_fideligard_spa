import React from "react";

const Table = ({ columnNames, data }) => {
	return (
		<table>
			<thead>
				<tr>{columnNames.map(column => <th>{column}</th>)}</tr>
			</thead>
			<tbody>
				{data.map(row => {
					return <tr>{row.map(cell => <td>{cell}</td>)}</tr>;
				})}
			</tbody>
		</table>
	);
};

export default Table;
