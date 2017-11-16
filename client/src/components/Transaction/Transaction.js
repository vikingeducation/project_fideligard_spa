import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Transaction = ({ transactions }) => {
  const transactionHeader = (
    <thead>
      <tr>
        <th>Date</th>
        <th>Symbol</th>
        <th>Type</th>
        <th>Quantity</th>
        <th>Price</th>
      </tr>
    </thead>
  );
  let transactionBody;
  if (transactions.length) {
    transactionBody = transactions.map(single => (
      <tr>
        <td>{single.date[0]}</td>
        <td>{single.symbol}</td>
        <td>{single.type}</td>
        <td>{single.quantity}</td>
        <td>${Number(single.price[0]).toFixed(2)}</td>
      </tr>
    ));
  } else {
    transactionBody = (
      <tr>
        <td>None</td>
      </tr>
    );
  }
  return (
    <table className="table table-bordered transactionTable">
      {transactionHeader}
      <tbody>{transactionBody}</tbody>
    </table>
  );
};

const mapStateToProps = state => {
  return {
    transactions: state.transactions
  };
};

export default connect(mapStateToProps)(Transaction);
