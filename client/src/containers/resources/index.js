import React from "react";
import { Segment, Header, Dropdown, Grid } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import capitalize from "../../lib/capitalize";

import PortfolioContainer from "./PortfolioContainer";
import TransactionsContainer from "./TransactionsContainer";
import TradeContainer from "./TradeContainer";

export const resources = {
  portfolio: PortfolioContainer,
  transactions: TransactionsContainer,
  trade: TradeContainer
};

export const resourceNames = Object.keys(resources);

const options = resourceNames.map(resource => ({
  text: capitalize(resource),
  value: resource
}));

const onChange = history => (e, data) => {
  history.push(`/${data.value}`);
};

export const ResourceContainer = withRouter(({ type, history }) => (
  <Segment>
    <Grid>
      <Grid.Column width={12}>
        <Header as="h2">{capitalize(type)}</Header>
      </Grid.Column>
      <Grid.Column width={4}>
        <Dropdown value={type} onChange={onChange(history)} options={options} />
      </Grid.Column>
    </Grid>
    {resources[type]()}
  </Segment>
));
