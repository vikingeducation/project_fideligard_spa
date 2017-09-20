import React from "react";
import currencyFormatter from "currency-formatter";
import Filter from "./Filter";

const transactionsList = transactions => {
  return transactions.map(transaction => {
    return (
      <tr key={transaction.id}>
        <td>{transaction.date} </td>
        <td>{transaction.symbol} </td>
        <td>{transaction.type} </td>
        <td>{transaction.quantity} </td>
        <td>{currencyFormatter.format(transaction.price, { code: "USD" })} </td>
      </tr>
    );
  });
};

const Transactions = ({ transactions, onKeyUp }) => {
  return (
    <div className="border">
      <h2>Transactions</h2>
      <Filter
        onKeyUp={onKeyUp}
        name="searchTransactions"
        placeholder="Filter by date or by symbol. Press enter to proceed"
      />
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>Symbol</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length
              ? transactionsList(transactions)
              : <p>No transactions made...</p>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
