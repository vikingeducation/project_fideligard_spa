import { connect } from "react-redux";
import Trades from "../components/Trades";
import serialize from "form-serialize";
import {
  getSpecificStock,
  addTransaction,
  updateBalance
} from "../actions";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state, ownProps) => {
  return {
    stock: state.specificStockData.stock,
    isFetching: state.specificStockData.isFetching,
    date: state.date,
    balance: state.balance
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChangeStock: (e, date) => {
      e.preventDefault();
      const form = e.target;
      const stock = serialize(form, { hash: true }).symbol;
      dispatch(getSpecificStock(stock, date));
    },
    onSubmit: (e, balance) => {
      const form = e.target;
      const data = serialize(form, { hash: true });
      if (data.total > balance) {
        ownProps.history.push("/failure");
      } else {
        dispatch(addTransaction(data));
        dispatch(updateBalance(-data.total));
        ownProps.history.push("/success");
      }
    }
  };
};

const TradesContainer = connect(mapStateToProps, mapDispatchToProps)(Trades);

export default withRouter(TradesContainer);
