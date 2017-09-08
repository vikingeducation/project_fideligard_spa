import React from "react";
import { Grid } from "semantic-ui-react";
import { resourceNames, resources } from "./resources";

const Page = ({ match }) => {
  const type = match.params.type;
  if (!resourceNames.includes(type)) return null; //not found?

  return <div>{resources[type]}</div>;
};

export default Page;
