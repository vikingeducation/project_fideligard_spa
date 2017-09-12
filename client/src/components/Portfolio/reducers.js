import * as PortfolioActions from './actions';

const initialState = {
	transactions: [],
	funds: 1000000,
	stock: {}
};

export default (state = initialState, action) => {
	switch (action.type) {
		case PortfolioActions.PURCHASE_STOCK:
			const totalCost = +action.data.cost.slice(1);
			return {
				transactions: [...state.transactions, action.data],
				funds: state.funds - totalCost,
				stock: Object.assign({}, state.stock, {
					[action.data.symbol]: state.stock[action.data.symbol]
						? state.stock[action.data.symbol] + +action.data.quantity
						: +action.data.quantity
				})
			};
		case PortfolioActions.SELL_STOCK:
			const totalValue = +(+action.data.quantity *
				+action.data.price.slice(1)).toFixed(2);
			return {
				transactions: [...state.transactions, action.data],
				funds: state.funds + totalValue,
				stock: Object.assign({}, state.stock, {
					[action.data.symbol]:
						state.stock[action.data.symbol] - +action.data.quantity
				})
			};
		default:
			return state;
	}
};
