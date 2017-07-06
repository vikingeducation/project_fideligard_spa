export const SET_QUANTITY = 'SET_QUANTITY'
export const UPDATE_FORM_STATUS = 'UPDATE_FORM_STATUS'
export const SET_TYPE = 'SET_TYPE'

export function setQuantity(data) {
  return {
    type: SET_QUANTITY,
    data
  }
}

export function updateFormStatus(data) {
  return {
    type: UPDATE_FORM_STATUS,
    data
  }
}


export function setType(data) {
  return {
    type: SET_TYPE,
    data
  }
}
