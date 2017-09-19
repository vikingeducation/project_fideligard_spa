import React from "react";
import Trade from "../../components/resources/Trade";

class TradeContainer extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {}

  render() {
    return <Trade />;
  }
}

export default () => <TradeContainer />;
