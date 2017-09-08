import React from 'react';
import RangeSlider from '../../RangeSlider';
import { NavLink } from 'react-router-dom';

import HistoricalSidebar from '../../../containers/HistoricalSidebar';

export const NavLinks = props => {
	return (
		<div className="card text-center">
			<div className="card-header">
				<ul className="nav nav-tabs card-header-tabs">
					<li className="nav-item">
						<NavLink className="nav-link" exact to="/">
							Portfolio
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="nav-link" exact to="/transactions">
							Transactions
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="nav-link" exact to="/trade">
							Trade
						</NavLink>
					</li>
				</ul>
			</div>
			<div className="card-body text-left">
				{props.children}
			</div>
		</div>
	);
};

export const MainContainer = props => {
	return (
		<main className="componentscontainer-fluid">
			<section className="row">
				<div className="col">
					<div className="container alert alert-success" role="alert">
						<strong>Well done!</strong> You successfully read this important
						alert message.
					</div>
				</div>
			</section>
			<div className="card">
				<h2 className="card-header">
					<strong>Dashboard</strong>
				</h2>
				<div className="card-block">
					<section className="row">
						<aside className="col-4 sidebar">
							<HistoricalSidebar />
						</aside>
						<div className="col-8">
							<div className="row justify-content-center">
								<div className="col-11">
									<RangeSlider />
									<NavLinks>
										{props.children}
									</NavLinks>
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>
		</main>
	);
};
