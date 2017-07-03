import * as Actions from '../actions/account'

export function account(state = {}, action) {
  switch (action.type) {
    case Actions.UPDATE_BALANCE:
      return {
        ...state,
        balance: state.balance + action.data
      }
    default:
      return state
  }
}
