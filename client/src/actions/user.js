export const CREATE_TRANSACTION = "CREATE TRANSACTION";
export const FAILED_TO_BUY = "FAILED TO BUY STOCK";
export const BUY_STOCK = "BUY STOCK";

export const createTransaction = newTransaction => {
  return {
    type: CREATE_TRANSACTION,
    data: newTransaction
  };
};
export const failedPurchase = error => {
  return {
    type: FAILED_TO_BUY,
    data: error
  };
};

//the user buys some stocks
export const buyStock = (amount, ticker) => async dispatch => {
  dispatch(createTransaction("stuff"));
};
