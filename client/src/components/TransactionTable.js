import React from 'react';
import moment from 'moment';

const TransactionRow = props => {
	let { data, currentValue } = props;
	const formatString = 'YYYY-MM-DD';

	return (
		<tr>
			<td>
				{props.date}
			</td>
			<td>
				{props.symbol}
			</td>
			<td>
				{props.action}
			</td>
			<td>
				{props.quantity}
			</td>
			<td>
				{props.cost}
			</td>
		</tr>
	);
};

const MAX_TABLE_ROWS = 25;
export default class MyTable extends React.PureComponent {
	render() {
		return (
			<div className="card transaction-table-card">
				<div className="card-block">
					<table className="table table-hover">
						<thead>
							<tr>
								<th>Date</th>
								<th>Symbol</th>
								<th>Type</th>
								<th>Quantity</th>
								<th colSpan="2">Price</th>
							</tr>
						</thead>
						<tbody>
							{this.props.transactions.map((transaction, idx) =>
								<TransactionRow
									key={`${transaction.symbol}_${idx}`}
									{...transaction}
								/>
							)}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}
