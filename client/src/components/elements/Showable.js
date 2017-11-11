import React from "react";
import PropTypes from "prop-types";

const Showable = ({ show, children }) => {
  if (!show) {
    return null;
  }
  return <div>{children}</div>;
};

Showable.propTypes = {
  show: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};

export default Showable;
