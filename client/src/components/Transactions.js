import React from 'react'
import Form from './Form'
import InputGroup from './elements/InputGroup'
import Input from './elements/Input'
import { Link } from 'react-router-dom'
import SortIcon from './elements/SortIcon'
import Table from './Table'
import Header from './Header'
import { numDisplay } from '../helpers/general'

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
    row.push(<td key={`${transaction.id}-price`}>{numDisplay(transaction.price)}</td>)
    return (<tr key={transaction.id}>{row}</tr>)
  })


  return (
    <main id="transactions">
       <Header title="Transactions" history={history} >
    <Form inline={true} classes="float-right mr-2">
      <InputGroup name="filter" text="Filter:" classes="col-md-2 col-form-label">
      <Input type="text" name="filter" onChange={setFilter}/>
      </InputGroup>
    </Form>
    </Header>
    <Table>
    <thead>
      <tr>{headers}</tr>
    </thead>
    <tbody key="transactions">
    {rows}
    </tbody>
    </Table>
  </main>
  )
}

export default Transactions
