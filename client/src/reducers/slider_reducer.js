import * as Actions from '../actions';
import moment from 'moment';

const initialState = {
  max: 366,
  min: 1,
  value: 366,
  outputPos: 0,
  outputText: moment().format('L')
};

const slider = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_SLIDER:
      return {
        ...state,
        value: action.data.value,
        outputPos: action.data.outputPos,
        outputText: action.data.outputText
      };
    default:
      return state;
  }
};

export default slider;
