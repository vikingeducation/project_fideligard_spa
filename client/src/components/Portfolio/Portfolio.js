import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { apiDate } from "../../helpers/helper";
import { getApiData } from "../../actions";

const Portfolio = ({ transactions, cash, latestStocks, getApiData }) => {
  const portfolioHeader = (
    <thead>
      <tr>
        <th>Symbol</th>
        <th>Quantity</th>
        <th>Cost Basis</th>
        <th>Transactioned Value</th>
        <th>Profit/Loss</th>
        <th>Current Price</th>

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

      <td />
    </tr>
  );
  let portfolioBody;
  if (transactions.length) {
    portfolioBody = transactions.map(single => (
      <tr key={"transaction" + single.symbol + single.date}>
        {/* Symbol */}
        <td>{single.symbol}</td>
        {/* Quantity */}
        <td>{single.quantity}</td>
        {/* Cost Basis */}
        <td>${(Number(single.quantity) * Number(single.price)).toFixed(2)}</td>
        {/* Transactioned Value */}
        <td>${Number(single.quantity * single.price).toFixed(2)}</td>
        {/* Profit/Loss */}
        <td>
          ${Number(
            single.quantity * single.price -
              single.quantity * latestStocks[single.symbol]
          ).toFixed(2)}
        </td>
        {/* Current Price */}
        <td>${Number(latestStocks[single.symbol]).toFixed(2)}</td>
        {/* Trade Link */}
        <td>
          <Link
            to={`/trade/${single.symbol}/${apiDate(single.date)}/${
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

const mapDispatchToProps = dispatch => {
  return {
    getApiData: (date, stocks) => {
      dispatch(getApiData(date, stocks));
    }
  };
};

Portfolio.propTypes = {
  transactions: PropTypes.array.isRequired,
  cash: PropTypes.number.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
