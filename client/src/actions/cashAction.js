export const CHANGE_CASH = "CHANGE_CASH";

export function changeCash(data) {
  return {
    type: CHANGE_CASH,
    data
  };
}
