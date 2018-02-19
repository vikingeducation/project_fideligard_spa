import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { apiDate } from "../../helpers/helper";

const Stock = ({
  yesterStock,
  weekStock,
  monthStock,
  todayStock,
  date,
  searchBox
}) => {
  let arrayStock = todayStock || yesterStock || weekStock || monthStock || {};

  let stocks = [];
  Object.keys(arrayStock).forEach(symbol => {
    //Filter stock list if search term is entered
    if (
      (searchBox.length && symbol.includes(searchBox.toUpperCase())) ||
      !searchBox.length
    ) {
      stocks.push(
        <tr id={symbol} key={symbol + date}>
          <td>{symbol}</td>
          <td>
            {todayStock ? "$" + Number(todayStock[symbol]).toFixed(2) : "--"}
          </td>
          <td>
            {yesterStock ? "$" + Number(yesterStock[symbol]).toFixed(2) : "--"}
          </td>
          <td>
            {weekStock ? "$" + Number(weekStock[symbol]).toFixed(2) : "--"}
          </td>
          <td>
            {monthStock ? "$" + Number(monthStock[symbol]).toFixed(2) : "--"}
          </td>
          <td>
            {todayStock ? (
              <Link
                to={`/trade/${symbol}/${apiDate(date)}/${todayStock[symbol]}/`}
              >
                trade
              </Link>
            ) : (
              "--"
            )}
          </td>
        </tr>
      );
    }
  });

  return stocks;
};

Stock.propTypes = {
  yesterStock: PropTypes.object,
  weekStock: PropTypes.object,
  monthStock: PropTypes.object,
  todayStock: PropTypes.object
};

export default Stock;
