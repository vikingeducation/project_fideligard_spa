import React from "react";
import { connect } from "react-redux";
let counter = 1;
const TransactionTable = ({ transactions }) => {
  let transactionList = transactions.map(transaction => {
    return (
      <tr key={counter++}>
        <td>{transaction.date}</td>
        <td>{transaction.stock.ticker}</td>
        <td>{transaction.type}</td>
        <td>{transaction.quantity}</td>
        <td>{transaction.stock.currentPrice}</td>
      </tr>
    );
  });

  return (
    <div className="col-sm-12">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>date</th>
            <th>ticker</th>
            <th>type</th>
            <th>quantity</th>
            <th>price</th>
          </tr>
        </thead>
        <tbody>
          {transactionList}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    transactions: state.transactions
  };
};

export default connect(mapStateToProps, null)(TransactionTable);
