import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Stock = ({ yesterStock, weekStock, monthStock, todayStock }) => {
  return (
    <tr id={todayStock[0]}>
      <td>{todayStock[0]}</td>
      <td>${todayStock[2].toFixed(2)}</td>
      <td>{(todayStock[2] - yesterStock[2]).toFixed(2)}</td>
      <td>{(todayStock[2] - weekStock[2]).toFixed(2)}</td>
      <td>{(todayStock[2] - monthStock[2]).toFixed(2)}</td>
      <td>
        <Link to={`/trade/${todayStock[0]}/${todayStock[2]}/`}>trade</Link>
      </td>
    </tr>
  );
};

Stock.propTypes = {
  yesterStock: PropTypes.array.isRequired,
  weekStock: PropTypes.array.isRequired,
  monthStock: PropTypes.array.isRequired,
  todayStock: PropTypes.array.isRequired
};

export default Stock;
