import React from "react";
import Subheader from "./Subheader";

const columnNames = ["Date", "Symbol", "Type", "Quantity", "Price"];

const Transactions = props => {
  return (
    <div>
      <Subheader title="Transactions" />
      {props.transactions.length > 0
        ? <table className="table table-striped table-bordered">
            <thead>
              <tr>
                {columnNames.map(column =>
                  <th key={column}>
                    {column}
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {props.transactions.map(transaction =>
                <tr>
                  <td>
                    {transaction.date}
                  </td>
                  <td>
                    {transaction.symbol}
                  </td>
                  <td>
                    {transaction.buySell}
                  </td>
                  <td>
                    {transaction.quantity}
                  </td>
                  <td>
                    {transaction.price}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        : <div>no transactions yet</div>}
    </div>
  );
};

export default Transactions;
