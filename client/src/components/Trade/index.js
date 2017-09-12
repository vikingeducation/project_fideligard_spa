import React, { Component } from 'react';
import Loadable from '../Loadable';
import moment from 'moment';
import serialize from 'form-serialize';
import { PurchaseInterface, CashInterface } from './wrappers';

export default class Trade extends Component {
	constructor(props) {
		super(props);

		this.state = {
			symbols: [],
			selected: 'AAL',
			quantity: 1,
			cost: 46.69
		};
	}

	makeTrade = e => {
		e.preventDefault();
		const formData = serialize(e.target, { hash: true });

		const method = formData.action + 'Stock';
		this.props.actions[method](formData);
	};

	getPrice = symbol => {
		const list = this.props.HistoricalSidebarReducer.data.list;
		if (!symbol || symbol.length === 0 || !list[symbol]) return 0;
		const stock = list[symbol];
		const currentValue = moment
			.unix(this.props.RangeSliderReducer.currentValue)
			.format('YYYY-MM-DD');

		let found = stock.find(day => day.date === currentValue);

		if (found) return found.close;
		return 'Price Unavailable';
	};

	changeSymbol = e => {
		this.setState({ selected: e.target.value });
		this._calculateTotals(this.state.quantity, e.target.value);
	};

	updateQuantity = e => {
		this._calculateTotals(e.target.value, this.state.selected);
	};

	_calculateTotals = (quantity, symbol) => {
		const price = this.getPrice(symbol);
		if (!isNaN(+price)) {
			this.setState({
				started: true,
				quantity,
				cost: quantity * price
			});
		}
	};

	componentWillReceiveProps(nextProps) {
		const symObj = nextProps.HistoricalSidebarReducer.data.list;
		if (symObj) {
			const keys = Object.keys(symObj);
			this.setState({ symbols: keys, selected: keys[0] });
		}
	}

	render() {
		return (
			<Loadable condition={!this.props.HistoricalSidebarReducer.isFetching}>
				<div className="row">
					<PurchaseInterface
						makeTrade={this.makeTrade}
						changeSymbol={this.changeSymbol}
						updateQuantity={this.updateQuantity}
						getPrice={this.getPrice}
						params={this.props.match.params}
						{...this.state}
						currentValue={this.props.RangeSliderReducer.currentValue}
					/>
					<CashInterface cash={this.props.PortfolioReducer.funds.toFixed(2)} />
				</div>
			</Loadable>
		);
	}
}
