import * as HistoricalSidebarActions from './actions';

const initialState = {
	data: [],
	isFetching: false,
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
			datatable.data.forEach(itemKeys => {
				const obj = {};
				let ticker = '';

				itemKeys.forEach((value, idx) => {
					const name = columns[idx].name;
					if (name === 'ticker') {
						ticker = value;
						if (!list[value]) {
							list[value] = [];
						}
					}

					obj[columns[idx].name] = value;
				});

				list[ticker].push(obj);
			});
			console.log('Result Count: ', Object.keys(list).length);
			console.log(list);

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
