import React from "react";
import { Grid, Container, Header, Segment } from "semantic-ui-react";
import { resourceNames, ResourceContainer } from "../containers/resources";
import Findable from "./elements/Findable";
import DateSliderContainer from "../containers/DateSliderContainer";

const Page = ({ match }) => {
  const type = match.params.type;
  return (
    <div>
      <Segment>
        <Header as="h1" textAlign="center">
          Fideligard
        </Header>
      </Segment>
      <Findable condition={resourceNames.includes(type)}>
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={6}>
                <ResourceContainer type="stocks" />
              </Grid.Column>
              <Grid.Column width={10}>
                <DateSliderContainer />
                <ResourceContainer type={type} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Findable>
    </div>
  );
};

export default Page;
