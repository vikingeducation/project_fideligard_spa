import React from "react";

function makeStockRows(stocks) {
    return stocks.map((stock) => {
        return (
            <tr>
              <td>1,001</td>
              <td>Lorem</td>
              <td>ipsum</td>
              <td>dolor</td>
              <td>sit</td>
              <td>trade</td>
            </tr>
        );
    });
}


const stocks = [1, 2, 3, 4, 5, 6];



const Stocks = () => {
  return (
    <nav className="col-sm-4 col-md-4 hidden-xs-down bg-faded sidebar">
      <h1>Stocks</h1>
      <div className="table-responsive">
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
            {makeStockRows(stocks)}
          </tbody>
        </table>
      </div>
    </nav>
  );
};

export default Stocks;
