import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";

const DateWidget = () => (
  <div className="panel">
    <label htmlFor="dateSelect">Select a Stock Date:</label>
    <input type="date" name="dateSelect" />
  </div>
);

export default DateWidget;
