import React from "react";
import { Grid } from "semantic-ui-react";
import { resourceNames, Resource } from "./resources";
import Findable from "./elements/Findable";

const Page = ({ match }) => {
  const type = match.params.type;
  return (
    <Findable condition={resourceNames.includes(type)}>
      <Resource type={type} />
    </Findable>
  );
};

export default Page;
