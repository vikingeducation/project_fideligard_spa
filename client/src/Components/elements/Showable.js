import React from "react";

const Showable = ({ isFetching, loadScreen, children }) => {
  loadScreen = loadScreen || <p>Loading...</p>;
  if (isFetching) {
    return <div>{loadScreen}</div>;
  }

  return <div>{children}</div>;
};

export default Showable;
