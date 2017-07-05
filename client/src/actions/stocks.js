export const GET_PRICES_REQUEST = 'GET_PRICES_REQUEST'
export const GET_PRICES_SUCCESS = 'GET_PRICES_SUCCESS'
export const GET_PRICES_FAILURE = 'GET_PRICES_FAILURE'
export const SET_FILTER = 'SET_FILTER'
export const STORE_LOOKUP_DATES = 'STORE_LOOKUP_DATES'
export const SORT_SYMBOLS = 'SORT_SYMBOLS'

export function getPricesRequest(data) {
  return {
    type: GET_PRICES_REQUEST
  }
}

export function getPricesSuccess(data) {
  return {
    type: GET_PRICES_SUCCESS,
    data: data
  }
}

export function getPricesFailure() {
  return {
    type: GET_PRICES_FAILURE
  }
}

export function setFilter(data) {
  return {
    type: SET_FILTER,
    data
  }
}

export function storeLookupDates(data) {
  return {
    type: STORE_LOOKUP_DATES,
    data
  }
}

export function sortSymbols(data) {
  return {
    type: SORT_SYMBOLS,
    data: data > 0 ? -1 : 1
  }
}

export function getStockPrices(start) {
  return (dispatch) => {
    dispatch(getPricesRequest())

    fetch(`/api/quandl/?dates=${start}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status} ${response.text}`)
        }
        return response.json()
      })
      .then(json => {
        dispatch(getPricesSuccess({
          prices: json,
          symbols: Object.keys(json)
        }))
      })
      .catch(error => {
        dispatch(getPricesFailure())
      })

  }
}
