import React from "react";
import Table from "./Table";

const sidebarColumns = [
  "Symbol",
  "Price",
  "1 Day",
  "7 Day",
  "30 Day",
  "Trade?"
];

const Sidebar = props =>
  <div className="Sidebar">
    <div className="flex-row Sidebar-top">
      <h2>Stocks</h2>
      <div>
        <label htmlFor="stockFilter">Filter: </label>
        <input type="text" name="stockFilter" />
      </div>
    </div>
    {props.sideBarData.length > 0
      ? <div>
          {console.log(props)}
          <Table
            columnNames={sidebarColumns}
            data={props.sideBarData}
            onClick={props.onClick}
            symbol={props.symbol}
            thisDatePrice={props.thisDatePrice}
          />;
        </div>
      : <div />}
  </div>;

export default Sidebar;
