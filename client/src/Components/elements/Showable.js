import React from "react";

const Showable = ({ isFetching, children }) => {
  // console.log("props = ", props);
  if (isFetching) {
    return null;
  }

  return <div>{children}</div>;
};

export default Showable;
