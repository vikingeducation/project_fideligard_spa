import React from "react";
import Select from "./elements/Select";
import { withRouter } from "react-router-dom";

const Dashboard = ({ children, history }) => {
  let options = [
    { value: "", text: "Select Action" },
    { value: "trade", text: "Trade" },
    { value: "transactions", text: "Transactions" },
    { value: "portfolio", text: "Portfolio" }
  ];
  return (
    <div>
      <Select
        options={options}
        onChange={e => {
          if (e.target.value === "trade") {
            return history.push(`/${e.target.value}?symbol=A`);
          } else {
            return history.push(`/${e.target.value}`);
          }
        }}
        value={history.location.pathname.slice(1)}
      />
      {children}
    </div>
  );
};
export default withRouter(Dashboard);
