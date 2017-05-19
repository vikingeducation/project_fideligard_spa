import React from "react";
import currencyFormatter from "currency-formatter";
import { Link } from "react-router-dom";
import { getTotals } from "../helpers";

const portfolioTransactionsList = portfolio => {
  return portfolio.map(transaction => {
    return (
      <tr key={transaction.id}>
        <td>{transaction.symbol} </td>
        <td>{transaction.quantity} </td>
        <td>
          {currencyFormatter.format(
            transaction.moneySpent - transaction.moneyEarned,
            { code: "USD" }
          )}
          {" "}
        </td>
        <td>
          {currencyFormatter.format(transaction.quantity * transaction.day_0, {
            code: "USD"
          })}
          {" "}
        </td>
        <td>
          {currencyFormatter.format(
            transaction.quantity * transaction.day_0 -
              (transaction.moneySpent - transaction.moneyEarned),
            { code: "USD" }
          )}
        </td>
        <td>
          {currencyFormatter.format(transaction.day_0 - transaction.day_1, {
            code: "USD"
          })}
        </td>
        <td>
          {currencyFormatter.format(transaction.day_0 - transaction.day_7, {
            code: "USD"
          })}
        </td>
        <td>
          {currencyFormatter.format(transaction.day_0 - transaction.day_30, {
            code: "USD"
          })}
        </td>
        <td><Link to={`/trade?symbol=${transaction.symbol}`}>trade</Link></td>
      </tr>
    );
  });
};

const Portfolio = ({ portfolio, cash }) => {
  const totals = getTotals(portfolio);
  return (
    <div className="border">
      <h2>Portfolio</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Cost Basis</th>
              <th>Current Value</th>
              <th>Profit/Loss</th>
              <th>1d</th>
              <th>7d</th>
              <th>30d</th>
            </tr>
          </thead>
          <tbody />
        </table>
      </div>
      <p>
        Your available cash:
        {" "}
        {currencyFormatter.format(cash, { code: "USD" })}
      </p>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Quantity</th>
              <th>Cost Basis</th>
              <th>Current Value</th>
              <th>Profit/Loss</th>
              <th>1d</th>
              <th>7d</th>
              <th>30d</th>
              <th>Trade?</th>
            </tr>
          </thead>
          <tbody>

            {portfolio.length
              ? portfolioTransactionsList(portfolio)
              : <p>No transactions made...</p>}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Portfolio;
