import React from "react";
import Decimal from "decimal.js";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const calculateChange = (a, b) => {
  a = new Decimal(a);
  b = new Decimal(b);
  return a.minus(b).toString();
};

const buildTable = (data, filter, sortDirection, onClickTrade) => {
  let results = [];
  let keys = Object.keys(data).sort();
  if (sortDirection === "ascending") {
    keys = keys.sort();
  } else {
    keys = keys.sort().reverse();
  }

  if (filter) {
    keys = keys.filter(key => key.indexOf(filter) !== -1);
  }

  for (let i = 0; i < keys.length; i++) {
    results.push(
      <tr key={keys[i]}>
        <td>{keys[i]}</td>
        <td>${data[keys[i]].today}</td>
        <td>${calculateChange(data[keys[i]].today, data[keys[i]].oneDay)}</td>
        <td>
          ${calculateChange(data[keys[i]].today, data[keys[i]].sevenDays)}
        </td>
        <td>
          ${calculateChange(data[keys[i]].today, data[keys[i]].thirtyDays)}
        </td>
        <td>
          <Link to="/trades" onClick={e => onClickTrade(keys[i])}>
            <Button bsStyle="primary">
              Trade
            </Button>
          </Link>
        </td>
      </tr>
    );
  }

  return results;
};

const determineCaret = direction => {
  let caret;
  if (direction === "descending") {
    caret = <span>&#9650;</span>;
  } else {
    caret = <span>&#9660;</span>;
  }

  return caret;
};
const StockTable = props => {
  const {
    stockData,
    filter,
    sortDirection,
    setSortDirection,
    onClickTrade
  } = props;
  let stockTableCells = buildTable(
    stockData.stocks,
    filter,
    sortDirection,
    onClickTrade
  );
  let caret = determineCaret(sortDirection);
  return (
    <Table striped>
      <thead>
        <tr>
          <th>
            <a onClick={setSortDirection} className="sortable">
              Symbol {caret}
            </a>
          </th>
          <th>Today</th>
          <th>1d</th>
          <th>7d</th>
          <th>30d</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {stockTableCells}
      </tbody>
    </Table>
  );
};

export default StockTable;
