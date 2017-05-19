import React from "react";

const TransactionTable = () => {
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
      </table>
    </div>
  );
};

export default TransactionTable;
