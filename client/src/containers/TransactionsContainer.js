import { connect } from "react-redux";
import Transactions from "../components/Transactions";
import serialize from "form-serialize";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state, ownProps) => {
  return {
    transactions: state.transactions
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: e => {
      e.preventDefault();
      const form = e.target;
      let filter = serialize(form, { hash: true }).filter || "";
      filter = filter.toUpperCase();
      ownProps.history.push(`/transactions?filter=${filter}`);
    }
  };
};

const TransactionsContainer = connect(mapStateToProps, mapDispatchToProps)(
  Transactions
);

export default withRouter(TransactionsContainer);
