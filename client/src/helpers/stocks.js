export function parseStockPrices(data, dates) {
  // [symbol, price, date]
  let parsed = {};

  for (let i = 0, day = 0; i < data.length; i++) {
    let symbol = data[i][0]
    let price = data[i][1]
    let date = data[i][2]
    parsed[symbol] = {...parsed[symbol] }
    parsed[symbol][date] = price
  }
  return parsed
}
