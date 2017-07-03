export const CREATE_TRANSACTION = 'CREATE_TRANSACTION'

export function createTransaction(data) {
  console.log('createTransaction', data)
  return {
    type: CREATE_TRANSACTION,
    data
  }
}
