import React from "react";
import { Table, Col, Panel } from "react-bootstrap";
import {getParams} from '../helpers';
import _ from 'lodash';

const buildTransactionsData = (transactions, query) => {
  let results = [];
  if (Object.keys(query).length > 0) {
    if (query.sort) {
      switch(query.sort) {
        case "symbol_asc":
          results = _.sortBy(transactions, "symbol");
          break;
        case "symbol_desc":
          results = _.sortBy(transactions, "symbol").reverse();
          break;
        case "date_asc":
          results = _.sortBy(transactions, "date");
          break;
        case "date_desc":
          results = _.sortBy(transactions, "date").reverse();
          break;
        case "type_asc":
          results = _.sortBy(transactions, "type");
          break;
        case "type_desc":
          results = _.sortBy(transactions, "type").reverse();
          break;
        case "price_asc":
          results = transactions.sort((a, b) => +a.price - +b.price);
          break;
        case "price_desc":
          results = transactions.sort((a, b) => +a.price - +b.price).reverse();
          break;
        case "quantity_asc":
          results = transactions.sort((a, b) => +a.quantity - +b.quantity);
          break;
        case "quantity_desc":
          results = transactions.sort((a, b) => +a.quantity - +b.quantity).reverse();
          break;
        case "total_asc":
          results = transactions.sort((a, b) => +a.total - +b.total);
          break;
        case "total_desc":
          results = transactions.sort((a, b) => +a.total - +b.total).reverse();
          break;
        default:
          results = [...transactions];
      }
    }
  } else {
    results = [...transactions]
  }
  return results.map((transaction, index) => (
    <tr key={index}>
      <td>{transaction.date}</td>
      <td>{transaction.symbol}</td>
      <td>${transaction.price}</td>
      <td>{transaction.quantity}</td>
      <td className="transaction-type">{transaction.type}</td>
      <td>${transaction.total}</td>
    </tr>
  ))
}

const Transactions = ({transactions, location}) => {
  let query = getParams(location.search);
  if (transactions.length === 0) {
    return (
      <Col md={6}>
        <Panel header="Transactions">
          No transactions found.
        </Panel>
      </Col>
    )
  }

  let transactionData = buildTransactionsData(transactions, query)
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
              <th>Type</th>
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
