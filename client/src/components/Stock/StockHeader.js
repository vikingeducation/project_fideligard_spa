import React from "react";

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
