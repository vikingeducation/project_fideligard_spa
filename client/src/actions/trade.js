export const SET_STOCK = 'SET_STOCK'
export const SET_QUANTITY = 'SET_QUANTITY'

export function setStock(data) {
  return {
    type: SET_STOCK,
    data
  }
}

export function setQuantity(data) {
  return {
    type: SET_QUANTITY,
    data
  }
}
