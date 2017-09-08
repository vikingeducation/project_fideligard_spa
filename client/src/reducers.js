import * from "./actions";

const initialState = {
	transactions: [],
	portfolio: [],
	balance: 100000,
	stockData: {}
};

FideligardApp = (state = initialState, action) => {
	switch (action.type) {
		case SET_STOCKS:
			return {
				...state,
				stockData: action.data
			}
		case CREATE_TRANSACTION:
			return {
				...state,
				transactions: [...transactions, action.data]
			}
		case UPDATE_BALANCE:
			return {
				...state,
				balance: balance + action.data
			}
		default:
			return state
	}
};

export default FideligardApp;
