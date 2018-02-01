import { connect } from 'react-redux';
import Trade from '../components/Trade';
import serialize from 'form-serialize';
import { setTransactionType, updateTransaction, createTransaction } from '../actions';
import { validateFormInfo } from '../helpers';

const mapStateToProps = (state) => {
  return {
    ...state.trade,
    ...validateFormInfo(state.trade)
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { currentPrice } = stateProps;
  const { dispatch } = dispatchProps;

  return {
    ...stateProps,
    ...ownProps,
    setType: (e) => {
      const type = e.target.value;
      dispatch(setTransactionType(type));
    },

    updateTransaction: (e) => {
      const quantity = parseInt(e.target.value, 10) || 0;

      let transactionData = {
        quantity,
        total: quantity * currentPrice
      };

      dispatch(updateTransaction(transactionData));
    },

    onSubmit: (e) => {
      e.preventDefault();
      const form = e.target;
      const body = serialize(form, { hash: true });

      dispatch(createTransaction(JSON.stringify(body)));
    }
  };
};

const TradeContainer = connect(
  mapStateToProps,
  null,
  mergeProps
)(Trade);

export default TradeContainer;
