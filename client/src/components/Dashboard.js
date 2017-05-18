import React from "react";
import Select from "./elements/Select";
import { withRouter } from 'react-router-dom';


const Dashboard = ({ children, history }) => {
    console.log("history obj", history);
  let options = [
    { value: "trade", text: "Trade" },
    { value: "transactions", text: "Transactions" },
    { value: "portfolio", text: "Portfolio" }
  ];
  return (
    <div>
      <Select options={options} onChange={(e) => history.push(`/${e.target.value}`)}/>
      {children}
    </div>
  );
};
export default withRouter(Dashboard);
