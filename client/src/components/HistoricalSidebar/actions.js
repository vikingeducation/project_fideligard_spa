export const GET_REQUEST_HISTORICAL_DATA = 'GET_REQUEST_HISTORICAL_DATA';
export const GET_SUCCESS_HISTORICAL_DATA = 'GET_SUCCESS_HISTORICAL_DATA';
export const GET_FAILURE_HISTORICAL_DATA = 'GET_FAILURE_HISTORICAL_DATA';

export const getRequestHistoricalData = () => ({
	type: GET_REQUEST_HISTORICAL_DATA
});

export const getSuccessHistoricalData = data => ({
	type: GET_REQUEST_HISTORICAL_DATA,
	data
});

export const getFailureHistoricalData = err => ({
	type: GET_REQUEST_HISTORICAL_DATA,
	err
});
