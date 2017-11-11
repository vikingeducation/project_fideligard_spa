import React from "react";
import PropTypes from "prop-types";

const Stock = ({ yesterStock, weekStock, monthStock, todayStock }) => {
  return (
    <tr key={todayStock[1]}>
      <td>{todayStock[0]}</td>
      <td>${todayStock[2]}</td>
      <td>{Math.floor(todayStock[2] * 100 - yesterStock[2] * 100) / 100}</td>
      <td>{Math.floor(todayStock[2] * 100 - weekStock[2] * 100) / 100}</td>
      <td>{Math.floor(todayStock[2] * 100 - monthStock[2] * 100) / 100}</td>
      <td>trade</td>
    </tr>
  );
};

export default Stock;
