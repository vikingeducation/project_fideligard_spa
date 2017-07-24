import _ from "lodash"
import Decimal from "decimal.js"

export const getParams = query => {
  if (!query) {
    return {}
  }

  return (/^[?#]/.test(query) ? query.slice(1) : query)
    .split("&")
    .reduce((params, param) => {
      let [key, value] = param.split("=")
      params[key] = value ? decodeURIComponent(value.replace(/\+/g, " ")) : ""
      return params
    }, {})
}

export const processPortfolioBuy = (transaction, portfolio) => {
  let results = { ...portfolio }
  if (!portfolio.hasOwnProperty(transaction.symbol)) {
    results[transaction.symbol] = transaction.quantity
  } else {
    let newQuantity = +portfolio[transaction.symbol] + +transaction.quantity
    results[transaction.symbol] = +newQuantity
  }

  return results
}

export const processPortfolioSell = (transaction, portfolio) => {
  let results = { ...portfolio }

  let newQuantity = +portfolio[transaction.symbol] - +transaction.quantity

  results[transaction.symbol] = +newQuantity

  return results
}

export const sortTransactions = (transactions, query) => {
  let results = [...transactions]
  if (Object.keys(query).length > 0) {
    if (query.sort) {
      switch (query.sort) {
        case "symbol_asc":
          results = _.sortBy(results, "symbol")
          break
        case "symbol_desc":
          results = _.sortBy(results, "symbol").reverse()
          break
        case "date_asc":
          results = _.sortBy(results, "date")
          break
        case "date_desc":
          results = _.sortBy(results, "date").reverse()
          break
        case "type_asc":
          results = _.sortBy(results, "type")
          break
        case "type_desc":
          results = _.sortBy(results, "type").reverse()
          break
        case "price_asc":
          results = results.sort((a, b) => +a.price - +b.price)
          break
        case "price_desc":
          results = results.sort((a, b) => +a.price - +b.price).reverse()
          break
        case "quantity_asc":
          results = results.sort((a, b) => +a.quantity - +b.quantity)
          break
        case "quantity_desc":
          results = results.sort((a, b) => +a.quantity - +b.quantity).reverse()
          break
        case "total_asc":
          results = results.sort((a, b) => +a.total - +b.total)
          break
        case "total_desc":
          results = results.sort((a, b) => +a.total - +b.total).reverse()
          break
        default:
          return
      }
    }
  }

  return results
}

export const filterTransactions = (transactions, query) => {
  let results = [...transactions]
  if (Object.keys(query).length > 0) {
    if (query.filter && query.filter.length > 0) {
      results = results.filter(
        transaction => transaction.symbol.indexOf(query.filter) !== -1
      )
    }
  }

  return results
}

export const parseFilterString = query => {
  let results = ""

  if (query.filter && query.filter.length > 0) {
    results = `&filter=${query.filter}`
  }

  return results
}

const addCurrency = (a, b) => {
  a = new Decimal(a)
  b = new Decimal(b)
  return a.plus(b).toString()
}

const subtractCurrency = (a, b) => {
  a = new Decimal(a)
  b = new Decimal(b)
  return a.minus(b).toString()
}

const multiplyCurrency = (a, b) => {
  a = new Decimal(a)
  b = new Decimal(b)
  return a.times(b).toString()
}

export const calculateIndividualStockTotals = (
  stockData,
  portfolio,
  transactions
) => {
  let results = {}

  // Cost Basis
  for (let symbol in portfolio) {
    results[symbol] = {}
    results[symbol].symbol = symbol
    let costBasis = 0
    transactions.forEach(transaction => {
      if (transaction.symbol === symbol) {
        if (transaction.type === "buy") {
          costBasis = addCurrency(costBasis, transaction.total)
        } else if (transaction.type === "sell") {
          costBasis = subtractCurrency(costBasis, transaction.total)
        }
      }
    })
    results[symbol].costBasis = costBasis
  }

  // Current Value
  for (let symbol in portfolio) {
    let quantity = portfolio[symbol]
    let price = stockData[symbol].today
    results[symbol].currentValue = multiplyCurrency(quantity, price)
    results[symbol].quantity = quantity
  }

  // Profit/Loss
  for (let symbol in portfolio) {
    let costBasis = results[symbol].costBasis
    let currentValue = results[symbol].currentValue
    results[symbol].profit = subtractCurrency(currentValue, costBasis)
  }

  // Stock Data
  for (let symbol in portfolio) {
    results[symbol].currentPrice = stockData[symbol].today
    results[symbol].oneDay = stockData[symbol].oneDay
    results[symbol].sevenDays = stockData[symbol].sevenDays
    results[symbol].thirtyDays = stockData[symbol].thirtyDays
  }

  return results
}

export const calculateGrandTotals = portfolio => {
  let results = {}

  let costBasis = 0
  for (let symbol in portfolio) {
    costBasis = addCurrency(costBasis, portfolio[symbol].costBasis)
  }
  results.costBasis = costBasis

  let currentValue = 0
  for (let symbol in portfolio) {
    currentValue = addCurrency(currentValue, portfolio[symbol].currentValue)
  }
  results.currentValue = currentValue

  let profit = 0
  for (let symbol in portfolio) {
    profit = addCurrency(profit, portfolio[symbol].profit)
  }
  results.profit = profit

  let oneDay = 0
  for (let symbol in portfolio) {
    oneDay = addCurrency(oneDay, portfolio[symbol].oneDay)
  }
  results.oneDay = oneDay

  let sevenDays = 0
  for (let symbol in portfolio) {
    sevenDays = addCurrency(sevenDays, portfolio[symbol].sevenDays)
  }
  results.sevenDays = sevenDays

  let thirtyDays = 0
  for (let symbol in portfolio) {
    thirtyDays = addCurrency(thirtyDays, portfolio[symbol].thirtyDays)
  }
  results.thirtyDays = thirtyDays

  return results
}
