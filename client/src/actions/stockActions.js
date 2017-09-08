import superagent from 'superagent';

import stockConstants from '../constants/stockConstants';


export function getStocksRequest() {
	return {
		type: stockConstants.GET_STOCKS_REQUEST
	};
}

export function getStocksSuccess(payload) {
	return {
		type: stockConstants.GET_STOCKS_SUCCESS,
		payload
	};
}

export function getStocksFailure(payload) {
	return {
		type: stockConstants.GET_STOCKS_FAILURE,
		payload
	};
}

export const getStocks = () => async dispatch => {
	dispatch(getStocksRequest());

	try {
		const response = await superagent
			.get('api/stocks')
			.buffer();
		dispatch(getStocksSuccess(response.body.response));
	} catch (e) {
		dispatch(getStocksFailure(e));
	}
};
