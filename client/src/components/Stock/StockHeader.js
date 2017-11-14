import React from "react";
import PropTypes from "prop-types";
import { dateDifference } from "../../helpers/helper";

const StockHeader = ({ stocks }) => {
  if (!stocks) {
    return (
      <tr>
        <th>Loading</th>
      </tr>
    );
  }
  return (
    <tr key={"header"}>
      <th>Symbol</th>
      <th>
        Price ({dateDifference(stocks[0][0][1], new Date()) > 1
          ? dateDifference(stocks[0][0][1], new Date()) + "d"
          : dateDifference(stocks[0][0][1], new Date()) === 1 ? "1d" : "Today"})
      </th>
      <th>{dateDifference(stocks[0][1][1], new Date()) + "d"}</th>
      <th>{dateDifference(stocks[0][2][1], new Date()) + "d"}</th>
      <th>{dateDifference(stocks[0][3][1], new Date()) + "d"}</th>
      <th>Trade?</th>
    </tr>
  );
};

StockHeader.propTypes = {
  stocks: PropTypes.array.isRequired
};

export default StockHeader;
