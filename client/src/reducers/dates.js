import * as Actions from '../actions/dates'

export function dates(state = {}, action) {
  switch (action.type) {
    case Actions.SET_CURRENT_DATE:
      return {
        ...state,
        current: action.data
      }
    default:
      return state
  }
}
