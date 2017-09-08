import {
	GET_STOCKS_REQUEST,
	GET_STOCKS_SUCCESS,
	GET_STOCKS_FAILURE
} from '../../constants/stockConstants';
import _ from 'lodash';

const initialState = {
	stocks: [],
	isFetching: false,
	error: null
};

export default (state = initialState, action = {}) => {
	let updated = _.merge({}, state);

	switch (action.type) {
		case GET_STOCKS_REQUEST:
			updated.isFetching = true;

			return updated;

		case GET_STOCKS_SUCCESS:
			updated.stocks = action.payload;

			return updated;

		case GET_STOCKS_FAILURE:
			updated.error = action.payload;

			return updated;

		default:
			return updated;
	}
};
