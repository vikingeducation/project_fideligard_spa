import * as Actions from '../actions';
import { combineReducers } from 'redux';
import moment from 'moment';

const initialSliderState = {
  max: 366,
  min: 1,
  value: 366,
  outputPos: 0,
  outputText: moment().format('L')
};

const slider = (state = initialSliderState, action) => {
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

export const fideligardApp = combineReducers({ slider });

