import * as Actions from '../actions/transactions'

export function transactions(state = [], action) {
  console.log('transactions', action)
  switch (action.type) {
    case Actions.CREATE_TRANSACTION:
      return [...state, action.data]
    default:
      return state
  }
}
