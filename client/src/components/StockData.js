import React from 'react';
import {Table, Panel} from 'react-bootstrap';
import Decimal from 'decimal.js';
import FilterContainer from '../containers/FilterContainer';

const calculateChange = (a, b) => {
  a = new Decimal(a);
  b = new Decimal(b);
  return a.minus(b).toString();
};

const buildTable = (data, filter) => {
  let results = [];

  if (!filter) {
    for (let stock in data) {
      results.push(
        <tr key={stock}>
          <td>{stock}</td>
          <td>${data[stock].today}</td>
          <td>${calculateChange(data[stock].today, data[stock].oneDay)}</td>
          <td>${calculateChange(data[stock].today, data[stock].sevenDays)}</td>
          <td>${calculateChange(data[stock].today, data[stock].thirtyDays)}</td>
        </tr>
      )
    }
  } else {
    for (let stock in data) {
      if (stock === filter) {
        results.push(
          <tr key={stock}>
            <td>{stock}</td>
            <td>${data[stock].today}</td>
            <td>${calculateChange(data[stock].today, data[stock].oneDay)}</td>
            <td>${calculateChange(data[stock].today, data[stock].sevenDays)}</td>
            <td>${calculateChange(data[stock].today, data[stock].thirtyDays)}</td>
          </tr>
        )
      }
    }
  }
  return results;
};

const StockData = props => {
  const {stockData, stockWatchlist, date, isFetching, filter} = props;
  let stockTableCells = buildTable(stockData.stocks, filter);
  let table = (
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
    </Table>)
  return (
    <Panel header={`Stock Data for ${date}`}>
      <FilterContainer 
        stockWatchlist={stockWatchlist}
        date={date}
      />
      {isFetching ? <span className="img-loader" /> : table}
    </Panel>
  );
};

export default StockData;