export const MAKE_TRANSACTION = "MAKE_TRANSACTION";

export function makeTransaction(data) {
  return {
    type: MAKE_TRANSACTION,
    data
  };
}
