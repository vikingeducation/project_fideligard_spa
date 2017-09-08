import React from 'react';

const StockRow = ({stockArr})=>{

	return (

		<tr>
			<td>{stockArr[0]}</td>
			<td>{stockArr[2]}</td>
			<td>140</td>
			<td>140</td>
			<td>140</td>
			<td>Trade</td>
		</tr>

		)
}



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
					{props.stocks.map(arr=>{
						return <StockRow stockArr={arr} key={arr[0]}/>
					})}
				</tbody>
			</table>
		</div>
	);
};
