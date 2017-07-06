export const UPDATE_BALANCE = 'UPDATE_BALANCE'

export function updateBalance(data) {
  return {
    type: UPDATE_BALANCE,
    data: data
  }
}
