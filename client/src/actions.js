export const SET_STOCKS = "SET_STOCKS";
export const CREATE_TRANSACTION = "CREATE_TRANSACTION";
export const UPDATE_BALANCE = "UPDATE_BALANCE";

export const createTransaction = data => {
	return { type: CREATE_TRANSACTION, data };
};

export const updateBalance = amount => {
	return {
		type: UPDATE_BALANCE,
		data: amount
	};
};

export const setStocks = stocks => {
	return {
		type: SET_STOCKS,
		data: stocks
	};
};

export const getStocks = () => async dispatch => {
	const response = await fetch("/api/prices");
	const stocks = await response.json();
	dispatch(setStocks(stocks));
};
