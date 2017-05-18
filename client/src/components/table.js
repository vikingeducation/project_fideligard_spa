import React from "react";

const Table = ({ results, isFetching, searchTerm }) => {
  if (isFetching) {
    return <p>loading...</p>;
  }

  const tableRows = results.map(stock => {
    return (
      <tr key={stock.ticker}>
        <td>{stock.ticker}</td>
        <td>{stock.currentPrice}</td>
        <td>{(stock.currentPrice - stock.price1).toFixed(2)}</td>
        <td>{(stock.currentPrice - stock.price7).toFixed(2)}</td>
        <td>{(stock.currentPrice - stock.price30).toFixed(2)}</td>
        <td>trade</td>
      </tr>
    );
  });

  return (
    <div className="col-sm-4">
      <table>
        <thead>
          <tr>
            <th>ticker</th>
            <th>today</th>
            <th>-1</th>
            <th>-7</th>
            <th>-30 </th>
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
