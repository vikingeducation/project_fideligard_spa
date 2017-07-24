import React from "react";
import { Form, FormGroup, Table, Col, Panel, FormControl, Button } from "react-bootstrap";
import { getParams, sortTransactions, filterTransactions, parseFilterString } from "../helpers";
import { Link } from "react-router-dom";

const buildTransactionsData = (transactions, query) => {
  let results = sortTransactions(transactions,query);
  results = filterTransactions(results, query);

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
  let filterString = parseFilterString(query);
  let transactionData = buildTransactionsData(transactions, query);
  if (transactionData.length === 0) {
    return (
      <Col md={5} xs={12}>
        <Panel header="Transactions">
          No transactions found.
        </Panel>
      </Col>
    );
  }
  return (
    <Col md={5} xs={12}>
      <Panel header="Transactions" className="transactions-panel">
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
