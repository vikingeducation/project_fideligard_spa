import React from 'react'
import { Form, FormGroup, Label, Input, Col, Table } from 'reactstrap'
import { Link } from 'react-router-dom'
import SortIcon from './elements/SortIcon'
import Header from './Header'
import { numDisplay } from '../helpers/helpers'

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
    <Form className="float-md-right mr-2">
    <FormGroup row>
    <Label for="filter" md={2}>Filter:</Label>
    <Col md={10}>
      <Input type="text" name="filter" onChange={setFilter}/>
      </Col>
      </FormGroup>
    </Form>
    </Header>
    <Table responsive>
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
