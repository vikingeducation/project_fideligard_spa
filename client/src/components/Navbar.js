import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse">

      <Link className="navbar-brand" to={"/"}>Rideligard Stocks</Link>

    </nav>
  );
};

export default Navbar;
