import React from "react";
import { Form, FormGroup, Table, Col, Panel, FormControl, Button } from "react-bootstrap";
import { getParams } from "../helpers";
import { Link } from "react-router-dom";
import _ from "lodash";

const buildTransactionsData = (transactions, query) => {
  let results = [...transactions];
  if (Object.keys(query).length > 0) {
    if (query.sort) {
      switch (query.sort) {
        case "symbol_asc":
          results = _.sortBy(results, "symbol");
          break;
        case "symbol_desc":
          results = _.sortBy(results, "symbol").reverse();
          break;
        case "date_asc":
          results = _.sortBy(results, "date");
          break;
        case "date_desc":
          results = _.sortBy(results, "date").reverse();
          break;
        case "type_asc":
          results = _.sortBy(results, "type");
          break;
        case "type_desc":
          results = _.sortBy(results, "type").reverse();
          break;
        case "price_asc":
          results = results.sort((a, b) => +a.price - +b.price);
          break;
        case "price_desc":
          results = results.sort((a, b) => +a.price - +b.price).reverse();
          break;
        case "quantity_asc":
          results = results.sort((a, b) => +a.quantity - +b.quantity);
          break;
        case "quantity_desc":
          results = results
            .sort((a, b) => +a.quantity - +b.quantity)
            .reverse();
          break;
        case "total_asc":
          results = results.sort((a, b) => +a.total - +b.total);
          break;
        case "total_desc":
          results = results.sort((a, b) => +a.total - +b.total).reverse();
          break;
        default:
          results = results;
      }
    }
    if (query.filter && query.filter.length > 0) {
      results = results.filter(transaction => transaction.symbol.indexOf(query.filter) !== -1);
    }
  }
  
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
  let filterString = "";
  if (query.filter && query.filter.length > 0) {
    filterString = `&filter=${query.filter}`;
  }
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
                  to={{ pathname: "/transactions", search: `sort=date_asc${filterString}` }}
                >
                  &#9650;
                </Link>
                <Link
                  to={{ pathname: "/transactions", search: `sort=date_desc${filterString}` }}
                >
                  &#9660;
                </Link>
              </th>
              <th>
                Symbol
                <Link
                  to={{ pathname: "/transactions", search: `sort=symbol_asc${filterString}` }}
                >
                  &#9650;
                </Link>
                <Link
                  to={{ pathname: "/transactions", search: `sort=symbol_desc${filterString}` }}
                >
                  &#9660;
                </Link>
              </th>
              <th>
                Price
                <Link
                  to={{ pathname: "/transactions", search: `sort=price_asc${filterString}` }}
                >
                  &#9650;
                </Link>
                <Link
                  to={{ pathname: "/transactions", search: `sort=price_desc${filterString}` }}
                >
                  &#9660;
                </Link>
              </th>
              <th>
                Quantity
                <Link
                  to={{
                    pathname: "/transactions",
                    search: `sort=quantity_asc${filterString}`
                  }}
                >
                  &#9650;
                </Link>
                <Link
                  to={{
                    pathname: "/transactions",
                    search: `sort=quantity_desc${filterString}`
                  }}
                >
                  &#9660;
                </Link>
              </th>
              <th>
                Type
                <Link
                  to={{ pathname: "/transactions", search: `sort=type_asc${filterString}` }}
                >
                  &#9650;
                </Link>
                <Link
                  to={{ pathname: "/transactions", search: `sort=type_desc${filterString}` }}
                >
                  &#9660;
                </Link>
              </th>
              <th>
                Total
                <Link
                  to={{ pathname: "/transactions", search: `sort=total_asc${filterString}`}}
                >
                  &#9650;
                </Link>
                <Link
                  to={{ pathname: "/transactions", search: `sort=total_desc${filterString}` }}
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
