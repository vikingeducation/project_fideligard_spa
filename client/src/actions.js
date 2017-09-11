export const SET_STOCKS = "SET_STOCKS";
export const CREATE_TRANSACTION = "CREATE_TRANSACTION";
export const UPDATE_BALANCE = "UPDATE_BALANCE";
export const SET_DATE = "SET_DATE";
export const UPDATE_PORTFOLIO = "UPDATE_PORTFOLIO";

export const createTransaction = data => {
	return { type: CREATE_TRANSACTION, data };
};

export const updateBalance = amount => {
	return {
		type: UPDATE_BALANCE,
		data: amount
	};
};

export const updatePortfolio = data => {
	return {
		type: UPDATE_PORTFOLIO,
		data: data
	};
};

export const setStocks = stocks => {
	return {
		type: SET_STOCKS,
		data: stocks
	};
};

export const setDate = date => {
	return {
		type: SET_DATE,
		data: date
	};
};

export const getStocks = () => async dispatch => {
	const response = await fetch("/api/prices");
	const stocks = await response.json();
	dispatch(setStocks(stocks));
};
