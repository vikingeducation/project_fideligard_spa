import React from 'react'
import StocksFilter from './StocksFilter'
import StockPriceList from './elements/StockPriceList'
import SortIcon from './elements/SortIcon'
import { Table } from 'reactstrap'

const Stocks = ({ onChange, order, sortSymbols, isFetching, ...rest }) => {


  let thead = ['Symbol', 'Price', '1d', '7d', '30d', 'Trade'].map((header) => {
    if (header === 'Symbol') {
      return <th key={header}><a href="#" onClick={sortSymbols} data-sort-order={order}>{ header } <SortIcon order={order} /></a></th>
    } else {
      return <th key={header}>{header}</th>
    }
  })

  return (
    <aside>
      <h2 className="inline-block">Stocks</h2>
      <StocksFilter onChange={onChange} />
      { isFetching ? 
        <p>Loading...</p>
        :
        ( <Table responsive>
        <thead>
          <tr>
            {thead}
          </tr>
        </thead>
       <StockPriceList {...rest} />
      </Table>)
      }
     
    </aside>)
}

export default Stocks
