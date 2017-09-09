import React from "react";

const Table = ({ rows, columns }) => {
  const tablerows = rows.map(row => {
    let td = columns.map((col, index) => <td>{row[index]}</td>);
    return <tr>{td}</tr>;
  });
  const tablehead = columns.map(col => <th>{col}</th>);

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
