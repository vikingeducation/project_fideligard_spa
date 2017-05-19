export const SELECT_TRADE = "SELECT_TRADE";
export const CHANGE_QUANTITY = "CHANGE_QUANTITY";

export function selectTrade(data) {
  return {
    type: SELECT_TRADE,
    data
  };
}

export function changeQuantity(data) {
  return {
    type: CHANGE_QUANTITY,
    data
  };
}
