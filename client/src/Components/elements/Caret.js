import React from "react";

const Caret = ({ direction, ...rest }) => {
  return (
    <i className={`fa fa-caret-${direction}`} aria-hidden="true" {...rest} />
  );
};

export default Caret;
