import React from 'react';
import {Table, Panel} from 'react-bootstrap';

const buildTable = data => {
  let results = [];
  for (let stock in data) {
    results.push(
      <tr key={stock}>
        <td>{stock}</td>
        <td>${data[stock].today}</td>
        <td>${data[stock].oneDay}</td>
        <td>${data[stock].sevenDays}</td>
        <td>${data[stock].thirtyDays}</td>
      </tr>
    )
  }
  return results;
};

const StockData = props => {
  console.log(props);
  const {stockData} = props;
  let stockTableCells = buildTable(stockData.stocks);
  return (
    <Panel header="Stock Data">
      <Table striped>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Today</th>
            <th>1d</th>
            <th>7d</th>
            <th>30d</th>
          </tr>
        </thead>
        <tbody>
          {stockTableCells}
        </tbody>
      </Table>
    </Panel>
  );
};

export default StockData;