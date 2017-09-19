import React from "react";
import { Link } from "react-router-dom";

const Table = ({ columnNames, data, onClick, thisDatePrice, symbol }) => {
  return (
    <table className="table table-striped table-bordered">
      <thead>
        <tr>
          {columnNames.map(column =>
            <th key={column}>
              {column}
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.length > 0
          ? data.map(row => {
              return (
                <tr key={row[0]}>
                  {row.map((cell, i) =>
                    <td key={i}>
                      {cell}
                    </td>
                  )}
                  <td>
                    <Link
                      to={`/trades`}
                      onClick={() => {
                        onClick(row[0], row[1]);
                      }}
                    >
                      trade
                    </Link>
                  </td>
                </tr>
              );
            })
          : ""}
      </tbody>
    </table>
  );
};

export default Table;
