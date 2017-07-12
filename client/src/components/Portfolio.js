import React from "react";
import { Col, Panel, Table, Button } from "react-bootstrap";
import {calculateIndividualStockTotals} from "../helpers";
import { Link } from "react-router-dom";

const buildIndividualStockTable = (stocks, onClickTrade, date) => {
  let results = [];
  for (let symbol in stocks) {
    results.push(
      <tr key={symbol}>
        <td>{stocks[symbol].symbol}</td>
        <td>{stocks[symbol].quantity}</td>
        <td>${stocks[symbol].costBasis}</td>
        <td>${stocks[symbol].currentValue}</td>
        <td>${stocks[symbol].profit}</td>
        <td>${stocks[symbol].currentPrice}</td>
        <td>${stocks[symbol].oneDay}</td>
        <td>${stocks[symbol].sevenDays}</td>
        <td>${stocks[symbol].thirtyDays}</td>
        <td>
          <Link to="/trades" onClick={() => onClickTrade(symbol, date)}>
            <Button bsStyle="primary">
              Trade
            </Button>
          </Link>
        </td>
      </tr>
    );
  }
  return results;
};

const Portfolio = ({stockData, portfolio, transactions, balance, onClickTrade, date}) => {
  let individualStockTotals = calculateIndividualStockTotals(stockData, portfolio, transactions);
  let individualStockTable = buildIndividualStockTable(individualStockTotals, onClickTrade, date);
  console.log(individualStockTotals);
  return (
    <Col md={5}>
      <Panel header="Portfolio">
        <Table striped>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Quantity</th>
              <th>Cost Basis</th>
              <th>Current Value</th>
              <th>Profit/Loss</th>
              <th>Current Price</th>
              <th>1d</th>
              <th>7d</th>
              <th>30d</th>
              <th>Trade</th>
            </tr>
          </thead>
          <tbody>
            {individualStockTable}
          </tbody>
        </Table>
      </Panel>
    </Col>
  );
};

export default Portfolio;
