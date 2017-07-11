import { connect } from "react-redux";
import Transactions from "../components/Transactions";

const mapStateToProps = (state, ownProps) => {
  return {
    transactions: state.transactions
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  };
};

const TransactionsContainer = connect(mapStateToProps, mapDispatchToProps)(Transactions);

export default TransactionsContainer;
