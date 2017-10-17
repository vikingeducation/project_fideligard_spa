import React from "react";
import { PropTypes } from "react";

//TODO: make this reusable
//TODO: figure out how to do the links
//TODO: make the title text centered
//TODO: add style

const Navbar = ({ brand, links, title }) => {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      <div className="navbar-brand">{brand}</div>
      <div className="navbar-nav mr-auto">
        <p>{title}</p>
        {/*
        <a className="nav-item" href="#">
          Link
        </a>
        <a className="nav-item" href="#">
          Link
        </a>
        <a className="nav-item" href="#">
          Link
        </a> */}
      </div>
    </nav>
  );
};

Navbar.PropTypes = {
  title: PropTypes.string
};
Navbar.defaultProps = {
  brand: <i className="fa fa-usd" aria-hidden="true" />,
  title: "Title"
};

export default Navbar;
