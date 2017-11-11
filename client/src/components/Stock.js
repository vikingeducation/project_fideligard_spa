import React from "react";
import PropTypes from "prop-types";

const Stock = ({ yesterStock, weekStock, monthStock, singleStock }) => {
  return (
    <tr key={singleStock[1]}>
      <td>
        {singleStock[0]} {singleStock[1]} {singleStock[2]}
      </td>
      <td>
        {yesterStock[0]} {yesterStock[1]} {yesterStock[2]}
      </td>
      <td>
        {weekStock[0]} {weekStock[1]} {weekStock[2]}
      </td>
      <td>
        {monthStock[0]} {monthStock[1]} {monthStock[2]}
      </td>
    </tr>
  );
};

export default Stock;
