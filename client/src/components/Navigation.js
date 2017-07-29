import React from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const NavLinks = () => {
  return (
    <Nav pullRight>
      <LinkContainer activeClassName="active" to="/trades">
        <NavItem eventKey={2}>Trades</NavItem>
      </LinkContainer>{" "}
      <LinkContainer activeClassName="active" to="/transactions">
        <NavItem eventKey={3}>Transactions</NavItem>
      </LinkContainer>
      <LinkContainer activeClassName="active" to="/portfolio">
        <NavItem eventKey={3}>Portfolio</NavItem>
      </LinkContainer>
    </Nav>
  );
};

const Navigation = ({ title }) => {
  return (
    <Navbar fluid inverse>
      <Navbar.Header>
        <Navbar.Brand>
          <a>{title}</a>
        </Navbar.Brand>
      </Navbar.Header>
      <NavLinks />
    </Navbar>
  );
};

export default Navigation;
