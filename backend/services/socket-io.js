const { QUANDL_BASE_URL, defineQuery } = require('../util/apiConst');
const superagent = require('superagent');

const GET_REQUEST_HISTORICAL_DATA = 'GET_REQUEST_HISTORICAL_DATA';
const GET_SUCCESS_HISTORICAL_DATA = 'GET_SUCCESS_HISTORICAL_DATA';
const GET_FAILURE_HISTORICAL_DATA = 'GET_FAILURE_HISTORICAL_DATA';

module.exports = io => client => {
	const _getHistoricalData = async data => {
		const query = defineQuery(data);

		try {
			let body = await superagent.get(QUANDL_BASE_URL).query(query);

			client.emit(GET_SUCCESS_HISTORICAL_DATA, body.body);
		} catch (err) {
			client.emit(GET_FAILURE_HISTORICAL_DATA, err);
		}
	};

	console.log('Socket connection started!');
	client.on(GET_REQUEST_HISTORICAL_DATA, _getHistoricalData);
};
