import React from 'react';

export default props => {
	return (
		<div>
			<h2>Stocks</h2>
			<input
				type="text"
				id="filter"
				name="filter"
				placeholder="filter stocks"
			/>
			<table className="table">
				<thead>
					<tr>
						<th>Symbol</th>
						<th>Price</th>
						<th>1d</th>
						<th>7d</th>
						<th>30d</th>
						<th>Trade?</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>John</td>
						<td>Doe</td>
						<td>140</td>
						<td>140</td>
						<td>140</td>
						<td>Trade</td>
					</tr>
					<tr>
						<td>John</td>
						<td>Doe</td>
						<td>140</td>
						<td>140</td>
						<td>140</td>
						<td>Trade</td>
					</tr>
					<tr>
						<td>John</td>
						<td>Doe</td>
						<td>140</td>
						<td>140</td>
						<td>140</td>
						<td>Trade</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};
