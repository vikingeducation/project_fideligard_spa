const React = require('react');

const StockRow = ({ data }) => {
	data = data.reverse();
	console.log(data);
	return (
		<tr>
			<th scope="row">
				{data.ticker}
			</th>
			<td>Pending...</td>
			{data.map(day =>
				<td key={day.date}>
					{day.close}
				</td>
			)}

			<td>Trade</td>
		</tr>
	);
};

const MAX_TABLE_ROWS = 25;
export default class MyTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = props.data;
		console.log('STATE: ', this.state);
	}
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
							{Object.keys(this.state.list).map(key =>
								<StockRow key={key} data={this.state.list[key]} />
							)}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

// <tr>
// 	<th scope="row">1</th>
// 	<td>Mark</td>
// 	<td>Otto</td>
// 	<td>@mdo</td>
// </tr>
// <tr>
// 	<th scope="row">2</th>
// 	<td>Jacob</td>
// 	<td>Thornton</td>
// 	<td>@fat</td>
// </tr>
// <tr>
// 	<th scope="row">3</th>
// 	<td colSpan="2">Larry the Bird</td>
// 	<td>@twitter</td>
// </tr>
