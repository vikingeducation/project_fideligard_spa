import React from "react";
import NotFound from "./NotFound";

const Findable = ({ condition, children }) =>
  !condition ? <NotFound /> : <div>{children}</div>;

export default Findable;
