import {
	GET_STOCKS_REQUEST,
	GET_STOCKS_SUCCESS,
	GET_STOCKS_FAILURE
} from '../../constants/stockConstants';
import superagent from 'superagent';

export function getStocksRequest() {
	return {
		type: GET_STOCKS_REQUEST
	};
}

export function getStocksSuccess(payload) {
	return {
		type: GET_STOCKS_SUCCESS,
		payload
	};
}

export function getStocksFailure(payload) {
	return {
		type: GET_STOCKS_FAILURE,
		payload
	};
}

export const getStocks = () => async dispatch => {
	dispatch(getStocksRequest());

	try {
		// const response = await superagent.get('http://swapi.co/api/films/');
		// dispatch(getStocksSuccess(response.body.results));
	} catch (e) {
		dispatch(getStocksFailure(e));
	}
};
