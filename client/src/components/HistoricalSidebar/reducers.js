import * as HistoricalSidebarActions from './actions';
import moment from 'moment';

const initialState = {
	data: {},
	isFetching: true,
	error: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case HistoricalSidebarActions.GET_REQUEST_HISTORICAL_DATA:
			return {
				...state,
				isFetching: true,
				error: null
			};
		case HistoricalSidebarActions.GET_SUCCESS_HISTORICAL_DATA:
			const datatable = action.data.datatable;
			// extract columns returned for mapping.
			const columns = datatable.columns;
			const list = {};

			datatable.data.forEach((itemKeys, idx, arr) => {
				let [ticker, date, close] = itemKeys;
				if (!list[ticker] || !Array.isArray(list[ticker])) {
					list[ticker] = [];
				}
				let currentDate = moment(date);
				let nextDate = moment(currentDate).add(1, 'd');
				list[ticker].push({
					ticker,
					date,
					close
				});

				// Check the next index.
				if (idx < arr.length - 1) {
					let [nTicker, nDate, nClose] = arr[idx + 1];
					let tempDate = moment(nDate),
						now = moment();
					if (!tempDate.isAfter(nextDate) || !tempDate.isSame(nextDate)) {
						while (nextDate.isBefore(tempDate)) {
							list[ticker].push({
								ticker,
								date: nextDate.format('YYYY-MM-DD'),
								close
							});
							nextDate.add(1, 'd');
						}
					}

					// If we're on the last one, pad until current day.
					if (nTicker !== ticker) {
						while (nextDate.isBefore(now)) {
							list[ticker].push({
								ticker,
								date: nextDate.format('YYYY-MM-DD'),
								close
							});
							nextDate.add(1, 'd');
						}
					}
				}
			});

			return {
				...state,
				data: { count: Object.keys(list).length, list },
				isFetching: false
			};
		case HistoricalSidebarActions.GET_FAILURE_HISTORICAL_DATA:
			console.log('Error: ', action.error);
			return {
				...state,
				error: action.error,
				isFetching: false
			};
		default:
			return state;
	}
};
