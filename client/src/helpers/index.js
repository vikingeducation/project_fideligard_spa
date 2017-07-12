import _ from "lodash";

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

export const sortTransactions = (transactions, query) => {
  let results = [...transactions];
  if (Object.keys(query).length > 0) {
    if (query.sort) {
      switch (query.sort) {
        case "symbol_asc":
          results = _.sortBy(results, "symbol");
          break;
        case "symbol_desc":
          results = _.sortBy(results, "symbol").reverse();
          break;
        case "date_asc":
          results = _.sortBy(results, "date");
          break;
        case "date_desc":
          results = _.sortBy(results, "date").reverse();
          break;
        case "type_asc":
          results = _.sortBy(results, "type");
          break;
        case "type_desc":
          results = _.sortBy(results, "type").reverse();
          break;
        case "price_asc":
          results = results.sort((a, b) => +a.price - +b.price);
          break;
        case "price_desc":
          results = results.sort((a, b) => +a.price - +b.price).reverse();
          break;
        case "quantity_asc":
          results = results.sort((a, b) => +a.quantity - +b.quantity);
          break;
        case "quantity_desc":
          results = results
            .sort((a, b) => +a.quantity - +b.quantity)
            .reverse();
          break;
        case "total_asc":
          results = results.sort((a, b) => +a.total - +b.total);
          break;
        case "total_desc":
          results = results.sort((a, b) => +a.total - +b.total).reverse();
          break;
        default:
          return;
      }
    }
  }

  return results;
};

export const filterTransactions = (transactions, query) => {
  let results = [...transactions];
  if (Object.keys(query).length > 0) {
    if (query.filter && query.filter.length > 0) {
      results = results.filter(transaction => transaction.symbol.indexOf(query.filter) !== -1);
    }
  }

  return results;
};

export const parseFilterString = query => {
  let results = "";
  
  if (query.filter && query.filter.length > 0) {
    results = `&filter=${query.filter}`;
  }

  return results;
};