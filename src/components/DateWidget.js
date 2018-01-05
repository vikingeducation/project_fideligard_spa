import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";

const DateWidget = ({ onChange }) => {
  console.log(onChange);
  return (
    <div className="panel">
      <label htmlFor="dateSelect">Select a Stock Date:</label>
      <input type="date" name="dateSelect" onChange={onChange} />
    </div>
  );
};

export default DateWidget;
