import React from "react";
import Caret from "./Caret";

const Table = ({ rows, columns, sorted, sortFunction }) => {
  // console.log("table sees rows = ", rows);
  const direction = sorted === "ASC" ? "up" : "down";
  const tablerows = rows.map((row, idx) => {
    let td = columns.map((col, index) => <td key={index}>{row[index]}</td>);
    return <tr key={idx}>{td}</tr>;
  });

  const tablehead = columns.map((col, idx) => {
    if (idx === 0) {
      return (
        <th key={idx} onClick={sortFunction} data={sorted}>
          {col}
          <Caret direction={direction} />
        </th>
      );
    }
    return <th key={idx}>{col}</th>;
  });

  return (
    <table className="table table-striped">
      <thead>
        <tr>{tablehead}</tr>
      </thead>
      <tbody>{tablerows}</tbody>
    </table>
  );
};
export default Table;
