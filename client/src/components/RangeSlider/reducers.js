import * as SliderActions from './actions';

const ONE_DAY_STEP = 8.64e7 / 1000;
const newDate = new Date();
const strippedDate =
	new Date(
		newDate.getFullYear(),
		newDate.getMonth(),
		newDate.getDate()
	).getTime() / 1000;

const initialState = {
	currentValue: strippedDate - ONE_DAY_STEP * 5,
	startDate: strippedDate - ONE_DAY_STEP * 5,
	endDate: strippedDate + ONE_DAY_STEP * 5
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
