export const CREATE_TRANSACTION = 'CREATE_TRANSACTION'

let id = 1
export function createTransaction(data) {
  console.log('createTransaction', data)
  return {
    type: CREATE_TRANSACTION,
    data: {
      ...data,
      id: id++
    }
  }
}
