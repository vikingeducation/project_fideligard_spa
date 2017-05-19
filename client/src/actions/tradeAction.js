export const SELECT_TRADE = "SELECT_TRADE";
export const CHANGE_QUANTITY = "CHANGE_QUANTITY";
export const REMOVE_TRADE = "REMOVE_TRADE";
export const CHANGE_TYPE = "CHANGE_TYPE";

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

export function removeTrade() {
  return {
    type: REMOVE_TRADE
  };
}

export function changeType(data) {
  return {
    type: CHANGE_TYPE,
    data
  };
}
