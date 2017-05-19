import React from "react";

const Table = ({ money }) => {
  return (
    <div className="col-sm-4">
      <p>Available funds: ${money}</p>
    </div>
  );
};

export default Table;
