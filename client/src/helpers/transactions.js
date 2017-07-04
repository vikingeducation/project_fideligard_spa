export const getParams = query => {
  if (!query) {
    return {};
  }
  return (/^[?#]/.test(query) ? query.slice(1) : query)
    .split('&')
    .reduce((params, param) => {
      let [key, value] = param.split('=');
      params[key] = value ?
        decodeURIComponent(value.replace(/\+/g, ' ')) :
        '';
      return params;
    }, {});
}

export function filterTransactions(transactions, term) {
  if (!term) {
    return transactions
  }
  term = term.toUpperCase()
  return transactions.filter((transaction) => {
    if (transaction.date.indexOf(term) > -1) {
      return transaction
    }
    if (transaction.symbol.indexOf(term) > -1) {
      return transaction
    }
    if (transaction.quantity.toString().indexOf(term) > -1) {
      return transaction
    }
    if (transaction.date.indexOf(term) > -1) {
      return transaction
    }
    if (transaction.price.toString().indexOf(term) > -1) {
      return transaction
    }
    if (transaction.type.indexOf(term) > -1) {
      return transaction
    }
  })
}

export function sortTransactions(transactions, sortBy, order) {
  sortBy = sortBy.toLowerCase()
  let copy = [...transactions]
  return copy.sort(function(a, b) {
    if (a[sortBy] < b[sortBy]) {
      return -1 * order
    }
    if (a[sortBy] > b[sortBy]) {
      return 1 * order
    }
    return 0
  })
}

export function groupByStock(transactions) {
  let grouped = {}
  transactions.forEach((trans) => {
    if (!grouped[trans.symbol]) {
      grouped[trans.symbol] = {}
    }
    let stock = grouped[trans.symbol]
    let isPurchase = trans.type === 'BUY'
    stock.quantity = (stock.quantity || 0) + (isPurchase ? trans.quantity : trans.quantity * -1)
    stock.costBasis = (stock.costBasis || 0) + (trans.quantity * trans.price * (isPurchase ? 1 : -1))
  })
  return grouped

}
