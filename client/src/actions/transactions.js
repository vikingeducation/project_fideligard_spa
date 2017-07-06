export const CREATE_TRANSACTION = 'CREATE_TRANSACTION'
export const SET_TRANSACTION_FILTER = 'SET_TRANSACTION_FILTER'
export const SET_SORT_ORDER = 'SET_SORT_ORDER'
export const SET_SORT_BY = 'SET_SORT_BY'

let id = 4
export function createTransaction(data) {
  return {
    type: CREATE_TRANSACTION,
    data: {
      ...data,
      id: id++
    }
  }
}

export function setTransactionFilter(data) {
  return {
    type: SET_TRANSACTION_FILTER,
    data
  }
}

export function setSortOrder(data) {
  return {
    type: SET_SORT_ORDER,
    data
  }
}

export function setSortBy(data) {
  return {
    type: SET_SORT_BY,
    data: data
  }
}
