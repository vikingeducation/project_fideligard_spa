import React from 'react'
import Navigation from './Navigation'
import Table from './Table'
import { displayPriceHistory, numDisplay } from '../helpers/general'
import { Link } from 'react-router-dom'

const Portfolio = ({ history, currentDate, allPrices, symbols, dateKeys, transactions }) => {

  let headers = ['Symbol', 'Quantity', 'Cost Basis', 'Current Value', 'Profit/Loss', 'Current Price', '1d', '7d', '30d', 'Trade'].map((header) => (
    <th key={header}>{header}</th>
  ))

  console.log('keys', Object.keys(transactions), dateKeys)
  console.log('transactions', transactions)

  // function numDisplay(num) {
  //   return isNaN(num) ? '-' : '$' + num.toFixed(2)
  // }

  let rows = []
  Object.keys(transactions).forEach((stock) => {
    console.log('stock', stock, allPrices)
    console.log('transaction', transactions[stock])
    let row = []
    let currentPrice = allPrices[stock][currentDate]
    let record = transactions[stock]
    let currentVal = currentPrice * record.quantity
    row.push(<td key={`symbol-${stock}`}>{stock}</td>)
    row.push(<td key={`quantity-${stock}`}>{record.quantity}</td>)
    row.push(<td key={`cost-basis-${stock}`}>{numDisplay(record.costBasis)}</td>)
    row.push(<td key={`current-value-${stock}`}>{numDisplay(currentVal)}</td>)
    row.push(<td key={`profit-loss-${stock}`}>{numDisplay(currentVal - record.costBasis)}</td>)
      // console.log('displayPriceHistory', displayPriceHistory(dateKeys, stock, allPrices))
    row.push(<td key={`currentPrice-${stock}`}>{ numDisplay(currentPrice)}</td>)
    dateKeys.forEach((date) => {
      row.push(<td key={`date-${stock}-${date}`}>{numDisplay(allPrices[stock][date] - currentPrice)}</td>)
    })
    row.push(<td key={`trade-${stock}`}>{
      currentPrice ? <Link to={{ pathname: '/trade/', search: `symbol=${stock}`}}>Trade</Link> :'Trade'}</td>)
    rows.push(<tr key={`row-${stock}`}>{row}</tr>)
  })

  return (
    <section id="portfolio">
    <Navigation history={history}/>
    <h2>Portfolio</h2>
    <Table>
    <thead>
      <tr>{headers}</tr>
    </thead>
    <tbody>
      {rows}
    </tbody>
    </Table>
    </section>
  )
}
export default Portfolio
