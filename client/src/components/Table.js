import React from "react";

const Table = ({ columnNames, data }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>{columnNames.map(column => <th key={column}>{column}</th>)}</tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map(row => {
            return (
              <tr key={row[0]}>
                {row.map((cell, i) => <td key={i}>{cell}</td>)}
                <td>
                  <a href={`/trades/${row[0]}`}>trade</a>
                </td>
              </tr>
            );
          })
        ) : (
          ""
        )}
      </tbody>
    </table>
  );
};

export default Table;
