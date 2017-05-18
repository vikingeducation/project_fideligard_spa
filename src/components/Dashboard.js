import React from "react";
import Select from "./elements/Select";

const DropDown = () => {};

const Dashboard = ({ children }) => {
  let options = [
    { value: "trade", text: "Trade" },
    { value: "transactions", text: "Transactions" },
    { value: "portfolio", text: "Portfolio" }
  ];
  return (
    <div>
      <Select options={options} />
      {children}
    </div>
  );
};
export default Dashboard;
