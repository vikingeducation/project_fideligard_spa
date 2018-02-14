import React from "react";
// import PropTypes from "prop-types";
// import { dateDifference } from "../../helpers/helper";
import { displayDate } from "../../helpers/helper";

const StockHeader = ({ todaysDate }) => {
  return (
    <tr key={"header"}>
      <th>Symbol</th>
      <th>Price</th>
      <th> -1d</th>
      <th> -7d</th>
      <th> -30d</th>
      <th>Trade?</th>
    </tr>
  );
};

export default StockHeader;
