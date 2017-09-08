import React from "react";
import Stocks from "../components/Stocks";

class StocksContainer extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {}

  render() {
    return <Stocks />;
  }
}

export default () => <StocksContainer />;
