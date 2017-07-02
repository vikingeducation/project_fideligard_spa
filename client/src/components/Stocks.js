import React from 'react'
import StocksFilter from './elements/StocksFilter'
import StockPriceList from './elements/StockPriceList'

const Stocks = ({ order, currentDate, dates, prices, symbols, onChange, sortSymbols }) => {


  let thead = ['Symbol', 'Price', '1d', '7d', '30d', 'Trade'].map((header) => {
    if (header === 'Symbol') {
      return <th key={header}><a href="#" onClick={sortSymbols} data-sort-order={order}>{header}{order > 0 ? '▲' : '▼' }</a></th>
    } else {
      return <th key={header}>{header}</th>
    }
  })


  return (
    <aside>
      <h2 className="inline-block">Stocks</h2>
      <StocksFilter onChange={onChange} />
      <table className="table table-responsive">
        <thead>
          <tr>
            {thead}
          </tr>
        </thead>
       <StockPriceList symbols={symbols} dates={dates} prices={prices} currentDate={currentDate} />
      </table>
    </aside>)
}

export default Stocks
