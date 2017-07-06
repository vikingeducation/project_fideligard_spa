import React from 'react'
import { Table } from 'reactstrap'

import {
  numDisplay
} from '../helpers/helpers'

const Aggregated = ({ data }) => {
  const headers = ['Cost Basis', 'Current Value', 'Profit/Loss', '1d', '7d', '30d'].map((header) => (<th key={`header-${header}`}>{header}</th>))

  return (
    <Table className="mb-5" responsive>
  <thead>
  <tr>{headers}</tr>
  </thead>
  <tbody>
  <tr>
    <td>{numDisplay(data.costBasis)}</td>
    <td>{numDisplay(data.currentValue)}</td>
    <td>{numDisplay(data.profitLoss)}</td>
    <td>{numDisplay(data.d0)}</td>
    <td>{numDisplay(data.d1)}</td>
    <td>{numDisplay(data.d2)}</td>
    </tr>
  </tbody>
  </Table>
  )
}

export default Aggregated
