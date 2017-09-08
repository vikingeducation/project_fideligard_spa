import React, { Component } from 'react';

const SidebarHeader = props => {
	return (
		<div>
			<div className="row sidebar-header">
				<div className="col-md-6">
					<span className="h3 historical-sidebar-header">Historical Data</span>
				</div>
				<div className="col-md-6 text-end">
					<form className="form-inline">
						<div className="form-group col">
							<input
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
			<div className="col">Sidebar!</div>
		</div>
	);
};

export default class HistoricalSidebar extends Component {
	render() {
		return (
			<div className="container-fluid historical-sidebar">
				<SidebarHeader />
				<SidebarBody />
			</div>
		);
	}
}
