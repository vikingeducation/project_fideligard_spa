import React from "react";

const HoldingsTable = () => {
  return (
    <div className="col-sm-12">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ticker</th>
            <th>quantity</th>
            <th>Cash Basis</th>
            <th>Current Value</th>
            <th>Profit/Loss</th>
            <th>Current Price</th>
            <th>1d</th>
            <th>7d</th>
            <th>30d</th>
            <th />
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default HoldingsTable;
