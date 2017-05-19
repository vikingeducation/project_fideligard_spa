import React from "react";
import { Link } from "react-router-dom";

const Table = ({ results, isFetching, searchTerm }) => {
  if (isFetching) {
    return <p>loading...</p>;
  }

  const tableRows = results.map(stock => {
    return (
      <tr key={stock.ticker}>
        <td>{stock.ticker}</td>
        <td>${stock.currentPrice}</td>
        <td>${(stock.currentPrice - stock.price1).toFixed(2)}</td>
        <td>${(stock.currentPrice - stock.price7).toFixed(2)}</td>
        <td>${(stock.currentPrice - stock.price30).toFixed(2)}</td>
        <td><Link to="/trade">trade</Link></td>
      </tr>
    );
  });

  return (
    <div className="well">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ticker</th>
            <th>today</th>
            <th>1d</th>
            <th>7d</th>
            <th>30d</th>
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
