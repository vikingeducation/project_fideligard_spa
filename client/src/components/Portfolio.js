import React from "react";
import { Col, Panel, Table } from "react-bootstrap";
import Decimal from "decimal.js";

const addCurrency = (a, b) => {
  a = new Decimal(a);
  b = new Decimal(b);
  return a.plus(b).toString();
};

const subtractCurrency = (a, b) => {
  a = new Decimal(a);
  b = new Decimal(b);
  return a.minus(b).toString();
};

const multiplyCurrency = (a, b) => {
  a = new Decimal(a);
  b = new Decimal(b);
  return a.times(b).toString();
}
// individual stock totals need to calculate:
// currrent price/1d/7d/30d <- same as stockData
// trade link FUCK

const calculateIndividualStockTotals = (stockData, portfolio, transactions) => {
  let results = {};

  // Cost Basis
  for (let symbol in portfolio) {
    results[symbol] = {};
    let costBasis = 0;
    transactions.forEach(transaction => {
      if (transaction.symbol === symbol) {
        if (transaction.type === "buy") {
          costBasis = addCurrency(costBasis, transaction.total);
        } else if (transaction.type === "sell") {
          costBasis = subtractCurrency(costBasis, transaction.total);
        }
      }
    });
    results[symbol].costBasis = costBasis;
  }

  // Current Value
  for (let symbol in portfolio) {
    let quantity = portfolio[symbol];
    let price = stockData[symbol].today;
    results[symbol].currentValue = multiplyCurrency(quantity, price);
  }

  // Profit/Loss
  for (let symbol in portfolio) {
    let costBasis = results[symbol].costBasis;
    let currentValue = results[symbol].currentValue;
    results[symbol].profit = subtractCurrency(currentValue, costBasis);
  }

  // Stock Data
  for (let symbol in portfolio) {
    results[symbol].currentPrice = stockData[symbol].today
    results[symbol].oneDay = stockData[symbol].oneDay
    results[symbol].sevenDays = stockData[symbol].sevenDays
    results[symbol].thirtyDays = stockData[symbol].thirtyDays
  }
  console.log(results);
};

const Portfolio = ({stockData, portfolio, transactions, balance}) => {
  let individualStockTotals = calculateIndividualStockTotals(stockData, portfolio, transactions);
  return (
    <Col md={6}>
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
        </Table>
      </Panel>
    </Col>
  );
};

export default Portfolio;
