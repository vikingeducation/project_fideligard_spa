export const MODIFY_PORTFOLIO = "MODIFY_PORTFOLIO";

export function modifyPortfolio(data) {
  return {
    type: MODIFY_PORTFOLIO,
    data
  };
}
