import * as Actions from '../actions/trade'

export function trade(state = {}, action) {
  switch (action.type) {
    case Actions.SET_QUANTITY:
      return {
        ...state,
        quantity: action.data
      }
    case Actions.UPDATE_FORM_STATUS:
      return {
        ...state,
        halfFilled: action.data
      }
    case Actions.SET_TYPE:
      return {
        ...state,
        type: action.data
      }
    default:
      return state
  }
}
