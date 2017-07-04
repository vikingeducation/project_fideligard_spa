import * as Actions from '../actions/portfolio'

export function portfolio(state = {}, action) {
  switch (action.type) {
    case Actions.SET_ORDER:
      return {
        ...state,
        order: action.data
      }

    default:
      return state
  }
}
