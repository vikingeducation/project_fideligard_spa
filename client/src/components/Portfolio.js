import React from 'react'
import Table from './Table'
import { numDisplay } from '../helpers/helpers'
import { Link } from 'react-router-dom'
import SortIcon from './elements/SortIcon'
import Aggregated from './Aggregated'
import Header from './Header'

const Portfolio = ({ history, currentDate, isFetching, order, allPrices, dates, symbols, transactions, sort, balance }) => {

  let headers = ['Symbol', 'Quantity', 'Cost Basis', 'Current Value', 'Profit/Loss', 'Current Price', '1d', '7d', '30d', 'Trade'].map((header) => {
    if (header === 'Symbol') {
      return <th key={header}> <Link to="#" onClick={sort} data-sort-order={order}>{header}<SortIcon order={order}/></Link></th>
    }
    return <th key={header}>{header}</th>
  })


  const cashRow = (
    <tr key={`cash`}><td>CASH</td>
    <td>${balance.toFixed(2)}</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    </tr>
  )

  const keys = order > 0 ? symbols.sort() : symbols.reverse()

  let aggregated = { costBasis: 0, currentValue: 0, profitLoss: 0, d0: 0, d1: 0, d2: 0 }

  let rows = [cashRow]
  if (allPrices) {
    keys.forEach((stock) => {
      let row = []
      let currentPrice = allPrices[stock] ? allPrices[stock].d0 : 0
      let record = transactions[stock]
      let currentVal = currentPrice * record.quantity
      row.push(<td key={`symbol-${stock}`}>{stock}</td>)
      row.push(<td key={`quantity-${stock}`}>{record.quantity}</td>)
      row.push(<td key={`cost-basis-${stock}`}>{numDisplay(record.costBasis)}</td>)
      row.push(<td key={`current-value-${stock}`}>{numDisplay(currentVal)}</td>)
      row.push(<td key={`profit-loss-${stock}`}>{numDisplay(currentVal - record.costBasis)}</td>)
      row.push(<td key={`currentPrice-${stock}`}>{ numDisplay(currentPrice)}</td>)
      dates.map((date, i) => {
        row.push(<td key={`date-${stock}-${date}`}>{numDisplay(allPrices[stock][date] - currentPrice)}</td>)
        aggregated['d' + i] += allPrices[stock][date] - currentPrice
      })
      row.push(<td key={`trade-${stock}`}>{
      currentPrice ? <Link to={{ pathname: '/trade/', search: `symbol=${stock}`}}>Trade</Link> :'Trade'}</td>)
      rows.push(<tr key={`row-${stock}`}>{row}</tr>)

      aggregated.costBasis += record.costBasis
      aggregated.currentValue += currentVal
      aggregated.profitLoss += currentVal - record.costBasis
    })
  }



  return (
    <section id="portfolio">
   <Header title="Portfolio" history={history} />
   
    { isFetching ? 
      <p>Loading...</p>
      :
      (<div>
        <Aggregated data={aggregated} />
        <Table>
    <thead>
      <tr>{headers}</tr>
    </thead>
    <tbody>
      {rows}
    </tbody>
    </Table>
    </div>
    )
    }
   
    </section>
  )
}
export default Portfolio
