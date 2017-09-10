import React from "react";

const Table = ({ rows, columns }) => {
  console.log("table sees rows = ", rows);
  const tablerows = rows.map((row, idx) => {
    let td = columns.map((col, index) => <td key={index}>{row[index]}</td>);
    return <tr key={idx}>{td}</tr>;
  });
  const tablehead = columns.map((col, idx) => <th key={idx}>{col}</th>);

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
