import React from 'react';
import{Link} from 'react-router-dom';

const StockRow = ({stockArr})=>{
	return (
		<tr>
			<td>{stockArr[0]}</td>
			<td>${stockArr[2]}</td>
			<td>${stockArr[3]}</td>
			<td>${stockArr[4]}</td>
			<td>${stockArr[5]}</td>
			<td><Link to='/trade'>Trade</Link></td>
		</tr>
	)
}

export default props => {
	const regx = new RegExp(props.filterText, 'i')
	return (
		<div>
			<h2>Stocks</h2>
			<input
				type="text"
				id="filter"
				name="filter"
				placeholder="filter stocks" 
				onChange={props.onFilterChange}
			/>
			<table className="table">
				<thead>
					<tr>
						<th>Symbol</th>
						<th>Price</th>
						<th>1d change</th>
						<th>7d change</th>
						<th>30d change</th>
						<th>Trade?</th>
					</tr>
				</thead>
				<tbody>
					{props.stocks.map(arr=>{
						if (regx.test(arr[0])) {
							return <StockRow stockArr={arr} key={arr[0]}/>
						} else return null
					})}
				</tbody>
			</table>
		</div>
	);
};
