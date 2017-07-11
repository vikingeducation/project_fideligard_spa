export const getParams = query => {
  if (!query) {
    return {};
  }

  return (/^[?#]/.test(query) ? query.slice(1) : query)
    .split("&")
    .reduce((params, param) => {
      let [key, value] = param.split("=");
      params[key] = value ? decodeURIComponent(value.replace(/\+/g, " ")) : "";
      return params;
    }, {});
};

export const processPortfolioBuy = (transaction, portfolio) => {
  let results = {};
  if (!portfolio.hasOwnProperty(transaction.symbol)) {
    results = {
      ...portfolio
    };
    results[transaction.symbol] = transaction.quantity;
  } else {
    let newQuantity = +portfolio[transaction.symbol] + +transaction.quantity;
    results[transaction.symbol] = +newQuantity;
  }

  return results;
};

export const processPortfolioSell = (transaction, portfolio) => {
  let results = { ...portfolio };

  let newQuantity = +portfolio[transaction.symbol] - +transaction.quantity;

  results[transaction.symbol] = +newQuantity;

  return results;
};
