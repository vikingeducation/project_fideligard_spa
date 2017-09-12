import React, { Component } from 'react';
import Loadable from '../Loadable';
import StockTable from '../StockTable';
import serialize from 'form-serialize';
const SidebarHeader = props => {
	return (
		<div>
			<div className="row sidebar-header">
				<div className="col-md-6">
					<span className="h3 historical-sidebar-header">Historical Data</span>
				</div>
				<div className="col-md-6 text-end">
					<form className="form-inline" onSubmit={props.filterHandler}>
						<div className="form-group col">
							<input
								name="filter-text"
								type="text"
								className="form-control mb-2 mr-sm-2 mb-sm-0"
								id="historical-data-filter"
								placeholder="Filter..."
							/>
						</div>
					</form>
				</div>
			</div>
			<hr />
		</div>
	);
};

const SidebarBody = props => {
	return (
		<div className="row sidebar-body historical-sidebar-body">
			<div className="col">
				<StockTable {...props.rangeSlider} data={props.stockData} />
			</div>
		</div>
	);
};

export default class HistoricalSidebar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			items: { list: [], count: 0 },
			filteredItems: { list: [], count: 0 }
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			items: nextProps.HistoricalSidebarReducer.data
		});
	}

	componentDidMount() {
		this.props.actions.getHistoricalData({
			socket: this.props.socket
		});
	}

	filterHandler = e => {
		let filterText = '';
		if (e) {
			e.preventDefault();
			filterText = serialize(e.target, { hash: true })['filter-text'];
		}

		const list = {},
			filterReg = new RegExp(filterText, 'gi');
		let count = 0;
		for (let key in this.state.items.list) {
			if (key.search(filterReg) !== -1) {
				list[key] = this.state.items.list[key];
				count++;
			}
		}

		this.setState({
			filteredItems: {
				count,
				list
			}
		});
	};

	render() {
		return (
			<div className="container-fluid historical-sidebar">
				<SidebarHeader filterHandler={this.filterHandler} />
				<Loadable condition={!this.props.HistoricalSidebarReducer.isFetching}>
					<SidebarBody
						rangeSlider={this.props.RangeSliderReducer}
						stockData={
							this.state.filteredItems.count
								? this.state.filteredItems
								: this.state.items
						}
					/>
				</Loadable>
			</div>
		);
	}
}
