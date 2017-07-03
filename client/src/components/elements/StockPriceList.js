import React from 'react'
import {
  Link
} from 'react-router-dom'

const StockPriceList = ({ symbols, dates, prices, currentDate }) => {

  function formatDifference(amount) {
    return amount < 0 ? '-$' + amount.toFixed(2).slice(1) : '+$' + amount.toFixed(2)
  }

  let rows = []
  if (symbols && prices && dates) {
    symbols.forEach((symbol) => {
      let row = []
      let currentPrice = prices[symbol][currentDate]
      row.push(<td key={`symbol-${symbol}`}>{symbol}</td>)
      dates.forEach((date) => {
        if (prices.hasOwnProperty(symbol) && prices[symbol].hasOwnProperty(date)) {
          if (date === currentDate) {
            row.push(<td key={`${symbol}-${date}-${prices[symbol][date]}`}>${currentPrice.toFixed(2)}</td>)
          } else {
            let price = prices[symbol][date] - currentPrice
            row.push(<td key={`${symbol}-${date}-${prices[symbol][date]}`}>{isNaN(price) ? '-' : formatDifference(price)}</td>)
          }
        } else {
          row.push(<td key={`${symbol}-${date}`}>-</td>)
        }
      })
      row.push(<td key={`trade-${symbol}`}>
        {currentPrice 
          ? 
          <Link to={{ 
            pathname: '/trade', 
          search: `symbol=${symbol}`}}>Trade</Link>
          :
          'Trade'
        }
          </td>)
      rows.push(<tr key={'row-' + symbol}>{row}</tr>)

    })
  }


  return (
    <tbody>
      {rows}
    </tbody>
  )
}

export default StockPriceList
