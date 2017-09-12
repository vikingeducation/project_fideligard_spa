import React, { Component } from 'react';
import TransactionTable from '../TransactionTable';

export default class Trade extends Component {
	render() {
		const transactions = this.props.PortfolioReducer.transactions;
		return <TransactionTable transactions={transactions} />;
	}
}
