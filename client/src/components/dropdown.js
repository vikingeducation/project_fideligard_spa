import React from "react";

const dropdown = ({ onChange }) => {
  return (
    <select onChange={onChange}>
      <option value="select">Select Page</option>
      <option value="/portfolio">Portfolio</option>
      <option value="/trade">Trade</option>
      <option value="/transactions">Transactions</option>

    </select>
  );
};

export default dropdown;
