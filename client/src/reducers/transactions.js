import * as Actions from '../actions/transactions'

export function transactions(state = {}, action) {
  switch (action.type) {
    case Actions.CREATE_TRANSACTION:
      return {
        ...state,
        history: [...state.history, action.data]
      }
    case Actions.SET_TRANSACTION_FILTER:
      return {
        ...state,
        filter: action.data
      }
    case Actions.SET_SORT_ORDER:
      return {
        ...state,
        order: action.data
      }
    case Actions.SET_SORT_BY:
      return {
        ...state,
        sortBy: action.data
      }
    default:
      return state
  }
}
