import React from "react";
import Portfolio from "../../components/resources/Portfolio";

class PortfolioContainer extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {}

  render() {
    return <Portfolio />;
  }
}

export default () => <PortfolioContainer />;
