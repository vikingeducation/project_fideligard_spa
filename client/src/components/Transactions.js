import React from "react";
import { Table, Col, Panel } from "react-bootstrap";
import {getParams} from '../helpers';

const buildTransactionsData = (transactions, query) => {

}

const Transactions = ({transactions, location}) => {
  console.log(getParams(location.search));
  if (transactions.length === 0) {
    return (
      <Col md={6}>
        <Panel header="Transactions">
          No transactions found.
        </Panel>
      </Col>
    )
  }
  let transactionData = transactions.map((transaction, index) => (
    <tr key={index}>
      <td>{transaction.date}</td>
      <td>{transaction.symbol}</td>
      <td>${transaction.price}</td>
      <td>{transaction.quantity}</td>
      <td>${transaction.total}</td>
    </tr>
  ))
  return (
    <Col md={6}>
      <Panel header="Transactions">
        <Table striped>
          <thead>
            <tr>
              <th>Date</th>
              <th>Symbol</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {transactionData}
          </tbody>
        </Table>
      </Panel>
    </Col>
  );
};

export default Transactions;
