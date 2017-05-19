import React from "react";

const OverviewTable = () => {
  return (
    <div className="col-sm-12">
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
      </table>
    </div>
  );
};

export default OverviewTable;
