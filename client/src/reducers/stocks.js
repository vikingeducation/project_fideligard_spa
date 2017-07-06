import * as Actions from '../actions/stocks'

export function stocks(state = {}, action) {
  switch (action.type) {
    case Actions.GET_PRICES_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case Actions.GET_PRICES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ...action.data
      }
    case Actions.GET_PRICES_FAILURE:
      return {
        ...state,
        isFetching: false,
      }
    case Actions.SET_FILTER:
      return {
        ...state,
        filter: action.data
      }
    case Actions.STORE_LOOKUP_DATES:
      return {
        ...state,
        dates: action.data
      }
    case Actions.SORT_SYMBOLS:
      return {
        ...state,
        order: action.data
      }
    default:
      return state
  }
}
