import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { MenuItem, DropdownButton } from "react-bootstrap";

const dropdown = ({ onChange }) => {
  return (
    <select onChange={onChange}>
      <option>Home</option>
      <option>number two</option>
    </select>
  );
};

export default dropdown;
