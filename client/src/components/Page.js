import React from "react";
import { Grid } from "semantic-ui-react";
import { resourceNames, resources } from "./resources";
import Findable from "./elements/Findable";

const Page = ({ match }) => {
  const type = match.params.type;
  return (
    <Findable condition={resourceNames.includes(type)}>
      {resources[type]}
    </Findable>
  );
};

export default Page;
