import { getQueryDates, datesToQueryString } from '../helpers/dates'
import { parseStockPrices } from '../helpers/stocks'


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
  console.log('getStockPrices called', start)
  console.log('getQueryDates', getQueryDates(start))
  const dates = getQueryDates(start)
  return (dispatch) => {
    dispatch(getPricesRequest())
    dispatch(storeLookupDates(dates))

    fetch(`/api/quandl/?dates=${datesToQueryString(dates)}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status} ${response.text}`)
        }
        return response.json()
      })
      .then(json => {
        const prices = parseStockPrices(json.datatable.data)
        dispatch(getPricesSuccess({
            prices: prices,
            symbols: Object.keys(prices)
          }))
          // store response
      })
      .catch(error => {
        console.log('getStockPrices error', error)
        dispatch(getPricesFailure())
      })

  }
}
