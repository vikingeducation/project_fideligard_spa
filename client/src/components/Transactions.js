import React from 'react'
import Navigation from './Navigation'
import Form from './Form'
import InputGroup from './elements/InputGroup'
import Input from './elements/Input'
import { Link } from 'react-router-dom'
import SortIcon from './elements/SortIcon'
import Table from './Table'

const Transactions = ({
  history,
  transactions,
  setFilter,
  sortBy,
  order,
  sort

}) => {

  const headers = ['Date', 'Symbol', 'Type', 'Quantity', 'Price'].map((header) => {
    if (header === 'Date' || header === 'Symbol') {
      return (<th key={`header-${header}`}>
      <Link to='#' onClick={sort} data-sort-order={order} data-sort-by={header}>{header}{sortBy === header ? <SortIcon order={order} /> : ''}</Link>
      </th>)

    } else {
      return (<th key={`header-${header}`}> { header } </th>)
    }
  })

  const rows = transactions.map((transaction) => {
    let row = []
    row.push(<td key={`${transaction.id}-date`}>{transaction.date}</td>)
    row.push(<td key={`${transaction.id}-symbol`}>{transaction.symbol}</td>)
    row.push(<td key={`${transaction.id}-type`}>{transaction.type}</td>)
    row.push(<td key={`${transaction.id}-quantity`}>{transaction.quantity}</td>)
    row.push(<td key={`${transaction.id}-price`}>{transaction.price.toFixed(2)}</td>)
    return (<tr key={transaction.id}>{row}</tr>)
  })


  return (
    <section id="transactions">
    <h2 className="inline-block">Transactions</h2>
    <Navigation history={history} />
    <Form inline={true} classes="float-right mr-2">
      <InputGroup name="filter" text="Filter:" classes="col-md-2 col-form-label">
      <Input type="text" name="filter" onChange={setFilter}/>
      </InputGroup>
    </Form>
    <Table>
    <thead>
      <tr>{headers}</tr>
    </thead>
    <tbody key="transactions">
    {rows}
    </tbody>
    </Table>
  </section>
  )
}

export default Transactions
