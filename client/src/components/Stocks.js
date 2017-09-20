import React from "react";
import currencyFormatter from "currency-formatter";
import Filter from "./Filter";
import Spinner from "./elements/Spinner";
import { Link } from "react-router-dom";

function makeStockRows(stocks) {
  return stocks.map(stock => {
    return (
      <tr key={stock.symbol}>
        <td>{stock.symbol}</td>
        <td>
          {stock.day_0
            ? currencyFormatter.format(+stock.day_0, { code: "USD" })
            : "N/A"}
        </td>
        <td>
          {stock.day_1
            ? currencyFormatter.format(+stock.day_0 - +stock.day_1, {
                code: "USD"
              })
            : "N/A"}
        </td>
        <td>
          {stock.day_7
            ? currencyFormatter.format(+stock.day_0 - +stock.day_7, {
                code: "USD"
              })
            : "N/A"}
        </td>
        <td>
          {stock.day_30
            ? currencyFormatter.format(+stock.day_0 - +stock.day_30, {
                code: "USD"
              })
            : "N/A"}
        </td>
        <td><Link to={`/trade?symbol=${stock.symbol}`}>trade</Link></td>
      </tr>
    );
  });
}

const Stocks = ({ stocks, date, setStocksFilter, isFetching }) => {
  return (
    <nav className="col-sm-4 col-md-4 hidden-xs-down bg-faded sidebar">

      <h1>Stocks</h1>
      <p>Date: {date}</p>
      <Filter
        name="searchStocks"
        onChange={setStocksFilter}
        placeholder="Filter"
      />
      {isFetching
        ? <Spinner />
        : <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Price</th>
                  <th>1D</th>
                  <th>7D</th>
                  <th>30D</th>
                  <th>Trade?</th>
                </tr>
              </thead>

              <tbody>
                {stocks.length ? makeStockRows(stocks) : null}

              </tbody>
            </table>
          </div>}
    </nav>
  );
};

export default Stocks;
