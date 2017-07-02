export function parseStockPrices(data) {
  // [symbol, price, date]
  let parsed = {}
  for (let i = 0; i < data.length; i++) {
    parsed[data[i][0]] = {...parsed[data[i][0]] }
    parsed[data[i][0]][data[i][2]] = data[i][1]
  }
  return parsed
}
