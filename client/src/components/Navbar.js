import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse">

      <Link className="navbar-brand" to={"/"}>
        Fideligard Historical Portfolio Simulator
      </Link>

    </nav>
  );
};

export default Navbar;
