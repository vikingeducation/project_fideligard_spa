import * as SliderActions from './actions';

const ONE_DAY_STEP = 8.64e7 / 1000;
const newDate = new Date();
const strippedDate = new Date(
	newDate.getFullYear(),
	newDate.getMonth(),
	newDate.getDate()
);

const initialState = {
	currentValue: new Date(strippedDate.getFullYear(), 0, 1).getTime() / 1000,
	startDate: new Date(strippedDate.getFullYear(), 0, 1).getTime() / 1000,
	endDate: strippedDate.getTime() / 1000
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SliderActions.SET_DATE_SLIDER_VALUES:
			return {
				...state,
				...action.data
			};
		default:
			return state;
	}
};
