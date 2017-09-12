import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

const StockRow = props => {
	let { data, currentValue } = props;
	const formatString = 'YYYY-MM-DD';
	let currentDate = moment.unix(currentValue);
	let currentValueTS = currentDate.format(formatString);

	const minus1 = currentDate.subtract(1, 'd').format(formatString),
		minus7 = currentDate.subtract(6, 'd').format(formatString),
		minus30 = currentDate.subtract(23, 'd').format(formatString);

	let stockData = data.filter(_extractReleventData);

	function _extractReleventData(item) {
		return (
			item.date === currentValueTS ||
			item.date === minus1 ||
			item.date === minus7 ||
			item.date === minus30
		);
	}

	return (
		<tr>
			<th scope="row">
				{stockData[0].ticker}
			</th>
			<td className="blue">
				${stockData[0].close}
			</td>
			{stockData.map((day, idx) => {
				const dayClose = +(stockData[0].close - day.close).toFixed(2);
				if (idx === 0) {
					return null;
				} else {
					if (dayClose > 0) {
						return (
							<td className="green" key={idx}>
								+${dayClose}
							</td>
						);
					}
					if (dayClose < 0) {
						return (
							<td className="red" key={idx}>
								-${dayClose}
							</td>
						);
					}
				}
			})}

			<td>
				<Link to={`/trade/${stockData[0].ticker}`}>Trade</Link>
			</td>
		</tr>
	);
};

const MAX_TABLE_ROWS = 25;
export default class MyTable extends React.Component {
	render() {
		return (
			<div className="card historial-sidebar-card">
				<div className="card-block">
					<table className="table table-hover">
						<thead>
							<tr>
								<th>#</th>
								<th>Price</th>
								<th>1d</th>
								<th>7d</th>
								<th colSpan="2">30d</th>
							</tr>
						</thead>
						<tbody>
							{Object.keys(this.props.data.list).map(key =>
								<StockRow
									key={key}
									currentValue={this.props.currentValue}
									data={this.props.data.list[key]}
								/>
							)}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}
