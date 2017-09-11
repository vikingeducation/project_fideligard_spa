import { connect } from "react-redux";
import Transactions from "../components/Transactions";

const mapStateToProps = state => {
  return {
    transactions: state.transactions
  };
};

export default connect(mapStateToProps, null)(Transactions);
