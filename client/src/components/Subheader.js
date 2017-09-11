import React from "react";
import { NavLink } from "react-router-dom";

const dropdownOptions = ["Trades", "Transactions", "Portfolio"];

export default ({ title, onChange }) =>
  <div className="Subheader">
    <h3>
      {title}
    </h3>
    {dropdownOptions.map((option, i) =>
      <NavLink to={`/${option}`} activeClassName="Subheader-active" key={i}>
        {option}
      </NavLink>
    )}
  </div>;
