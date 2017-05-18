import React from 'react';

const Table = ({ results, isFetching }) => {
  console.log('Results inside table component:', results);
  if (isFetching) {
    return <p>loading...</p>;
  }
  const tableRows = results.map(stock => {
    return (
      <tr>
        <td>{stock.ticker}</td>
        <td>{stock.currentPrice}</td>
        <td>{stock.price1}</td>
        <td>{stock.price7}</td>
        <td>{stock.price30}</td>
        <td>trade</td>
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>ticker</th>
          <th>today</th>
          <th>yesterday</th>
          <th>7 days ago</th>
          <th>30 days ago</th>
        </tr>
      </thead>
      <tbody>
        {tableRows}
      </tbody>
    </table>
  );
};

export default Table;
