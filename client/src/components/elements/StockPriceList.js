import React from 'react'
import {
  Link
} from 'react-router-dom'
import { numDisplay } from '../../helpers/general'

const StockPriceList = ({ symbols, dates, prices, currentDate }) => {


  let rows = []
  if (symbols && prices && dates) {
    symbols.forEach((symbol) => {
      let row = []
      let currentPrice = prices[symbol][currentDate]
      row.push(<td key={`symbol-${symbol}`}>{symbol}</td>)
      row.push(<td key={`current-${symbol}-${currentDate}-${prices[symbol][currentDate]}`}>{numDisplay(currentPrice)}</td>)
      dates.slice(1).forEach((date) => {
        row.push(<td key={`date-${symbol}-${date}`}>{numDisplay(prices[symbol][date] - currentPrice)}</td>)
      })
      row.push(<td key={`trade-${symbol}`}>
        {currentPrice ? <Link to={{pathname: '/trade', search: `symbol=${symbol}`}}>Trade</Link> :'Trade'}</td>)
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
