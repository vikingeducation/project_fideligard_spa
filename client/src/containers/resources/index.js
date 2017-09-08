import React from "react";
import { Segment, Header, Dropdown } from "semantic-ui-react";
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

const RoutedResourceContainer = ({ type, history, location }) => (
  <Segment>
    <Header as="h2">
      {capitalize(type)}{" "}
      <Dropdown value={type} onChange={onChange(history)} options={options} />
    </Header>
    {resources[type]()}
  </Segment>
);

export const ResourceContainer = withRouter(RoutedResourceContainer);
