import React from "react";
import { Form, FormGroup, Table, Col, Panel, FormControl, Button } from "react-bootstrap";
import { getParams } from "../helpers";
import { Link } from "react-router-dom";
import _ from "lodash";

const buildTransactionsData = (transactions, query) => {
  let results = [];
  if (Object.keys(query).length > 0) {
    if (query.sort) {
      switch (query.sort) {
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
          results = transactions
            .sort((a, b) => +a.quantity - +b.quantity)
            .reverse();
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
    } else if (query.filter && query.filter.length > 0) {
      results = transactions.filter(transaction => transaction.symbol.indexOf(query.filter) !== -1);
    }
  } else {
    results = [...transactions];
  }
  console.log(results);
  return results.map((transaction, index) =>
    <tr key={index}>
      <td>{transaction.date}</td>
      <td>{transaction.symbol}</td>
      <td>${transaction.price}</td>
      <td>{transaction.quantity}</td>
      <td className="transaction-type">{transaction.type}</td>
      <td>${transaction.total}</td>
    </tr>
  );
};

const Transactions = ({ transactions, location, transactionsSort, onSubmit}) => {
  let query = getParams(location.search);
  let transactionData = buildTransactionsData(transactions, query);
  if (transactionData.length === 0) {
    return (
      <Col md={6}>
        <Panel header="Transactions">
          No transactions found.
        </Panel>
      </Col>
    );
  }
  return (
    <Col md={6}>
      <Panel header="Transactions">
        <Form horizontal onSubmit={onSubmit}>
          <FormGroup controlId="transactionFilter">
            <Col md={8}>
              <FormControl
                type="text"
                name="filter"
                placeholder="Filter by a specific stock"
              />
            </Col>
            <Col md={4}>
              <Button bsStyle="success" type="submit">Filter</Button>
            </Col>
          </FormGroup>
        </Form>
        <Table striped>
          <thead>
            <tr>
              <th>
                Date
                <Link
                  to={{ pathname: "/transactions", search: "sort=date_asc" }}
                >
                  &#9650;
                </Link>
                <Link
                  to={{ pathname: "/transactions", search: "sort=date_desc" }}
                >
                  &#9660;
                </Link>
              </th>
              <th>
                Symbol
                <Link
                  to={{ pathname: "/transactions", search: "sort=symbol_asc" }}
                >
                  &#9650;
                </Link>
                <Link
                  to={{ pathname: "/transactions", search: "sort=symbol_desc" }}
                >
                  &#9660;
                </Link>
              </th>
              <th>
                Price
                <Link
                  to={{ pathname: "/transactions", search: "sort=price_asc" }}
                >
                  &#9650;
                </Link>
                <Link
                  to={{ pathname: "/transactions", search: "sort=price_desc" }}
                >
                  &#9660;
                </Link>
              </th>
              <th>
                Quantity
                <Link
                  to={{
                    pathname: "/transactions",
                    search: "sort=quantity_asc"
                  }}
                >
                  &#9650;
                </Link>
                <Link
                  to={{
                    pathname: "/transactions",
                    search: "sort=quantity_desc"
                  }}
                >
                  &#9660;
                </Link>
              </th>
              <th>
                Type
                <Link
                  to={{ pathname: "/transactions", search: "sort=type_asc" }}
                >
                  &#9650;
                </Link>
                <Link
                  to={{ pathname: "/transactions", search: "sort=type_desc" }}
                >
                  &#9660;
                </Link>
              </th>
              <th>
                Total
                <Link
                  to={{ pathname: "/transactions", search: "sort=total_asc" }}
                >
                  &#9650;
                </Link>
                <Link
                  to={{ pathname: "/transactions", search: "sort=total_desc" }}
                >
                  &#9660;
                </Link>
              </th>
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
