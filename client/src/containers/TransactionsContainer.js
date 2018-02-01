import { connect } from 'react-redux';
import Transactions from '../components/Transactions';
import { getTransactions, sortTransactions } from '../actions';
import { sortTransactionsByColumn } from '../helpers';

const mapStateToProps = (state) => {
  let transactionState = state.transactionsInfo;
  return {
    ...transactionState,
    transactions: sortTransactionsByColumn(transactionState),
    sortDirection: transactionState.sortBy.direction,
    sortColumn: transactionState.sortBy.column
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTransactions: () => {
      dispatch(getTransactions());
    },

    sort: (column) => {
      dispatch(sortTransactions(column));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
