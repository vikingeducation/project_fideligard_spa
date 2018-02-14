import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { apiDate, dateDifference } from "../../helpers/helper";

const Portfolio = ({ transactions, cash }) => {
  const portfolioHeader = (
    <thead>
      <tr>
        <th>Symbol</th>
        <th>Quantity</th>
        <th>Cost Basis</th>
        <th>Current Value</th>
        <th>Profit/Loss</th>
        <th>Current Price</th>
        <th>
          {transactions[0] ? dateDifference(transactions[0].date[1]) : "0"}d
        </th>
        <th>
          {transactions[0] ? dateDifference(transactions[0].date[2]) : "0"}d
        </th>
        <th>
          {transactions[0] ? dateDifference(transactions[0].date[3]) : "0"}d
        </th>
        <th>trade</th>
      </tr>
    </thead>
  );
  let portfolioBodyHead = (
    <tr>
      <td>CASH</td>
      <td>${cash.toFixed(2)}</td>
      <td>${cash.toFixed(2)}</td>
      <td>${cash.toFixed(2)}</td>
      <td>$0.00</td>
      <td>$0.00</td>
      <td>$0.00</td>
      <td>$0.00</td>
      <td>$0.00</td>
      <td />
    </tr>
  );
  let portfolioBody;
  if (transactions.length) {
    portfolioBody = transactions.map(single => (
      <tr>
        <td>{single.symbol}</td>
        <td>
          {single.type === "BUY" ? "+" : "-"}
          {single.quantity}
        </td>
        <td>
          ${Number(
            single.quantity * single.price[0] -
              single.quantity * single.price[3] -
              single.price[0]
          ).toFixed(2)}
        </td>
        <td>${Number(single.quantity * single.price[0]).toFixed(2)}</td>
        <td>
          ${Number(
            single.quantity * single.price[0] -
              single.quantity * single.price[3]
          ).toFixed(2)}
        </td>
        <td>${Number(single.price[0]).toFixed(2)}</td>
        <td>${Number(single.price[0] - single.price[1]).toFixed(2)}</td>
        <td>${Number(single.price[0] - single.price[2]).toFixed(2)}</td>
        <td>${Number(single.price[0] - single.price[3]).toFixed(2)}</td>
        <td>
          <Link
            to={`/trade/${single.symbol}/${apiDate(single.date[0])}/${
              single.price[0]
            }/`}
          >
            trade
          </Link>
        </td>
      </tr>
    ));
  } else {
    portfolioBody = (
      <tr>
        <td>None</td>
      </tr>
    );
  }
  return (
    <table className="table table-bordered portfolioTable">
      {portfolioHeader}
      <tbody>
        {portfolioBodyHead}
        {portfolioBody}
      </tbody>
    </table>
  );
};

const mapStateToProps = state => {
  return {
    transactions: state.transactions,
    cash: state.cash
  };
};

Portfolio.propTypes = {
  transactions: PropTypes.array.isRequired,
  cash: PropTypes.number.isRequired
};

export default connect(mapStateToProps)(Portfolio);
