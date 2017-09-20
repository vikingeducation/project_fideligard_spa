import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Transactions from "../components/Transactions";
import parse from "url-parse";

class TransactionsContainer extends Component {
  render() {
    return <Transactions {...this.props} />;
  }
}
const getSearchResults = (filterBy, transactions) => {
  if (!filterBy) {
    return transactions;
  }
  let regex = new RegExp(filterBy, "i");
  return transactions.filter(
    transaction =>
      regex.exec(transaction.symbol) || regex.exec(transaction.date)
  );
};
const mapStateToProps = (state, ownProps) => {
  let url = parse(ownProps.location.search, true);
  let filterBy = url.query.q;
  return {
    transactions: getSearchResults(filterBy, state.transactions)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onKeyUp: e => {
      if (e.key === "Enter") {
        ownProps.history.push(`/transactions?q=${e.target.value}`);
      }
    }
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TransactionsContainer)
);
