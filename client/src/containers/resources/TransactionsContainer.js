import React from "react";
import Transactions from "../../components/resources/Transactions";

class TransactionsContainer extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {}

  render() {
    return <Transactions />;
  }
}

export default () => <TransactionsContainer />;
