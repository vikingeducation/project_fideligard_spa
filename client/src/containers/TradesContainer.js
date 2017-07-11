import { connect } from "react-redux";
import Trades from "../components/Trades";
import serialize from "form-serialize";
import { getSpecificStock } from "../actions";
import {withRouter} from 'react-router-dom'

const mapStateToProps = (state, ownProps) => {
  return {
    stock: state.specificStockData.stock,
    isFetching: state.specificStockData.isFetching,
    date: state.date
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
    onSubmit: e => {
      e.preventDefault();
      const form = e.target;
      const data = serialize(form, { hash: true });
      console.log(data);
      // here provide validations, and add to transactions
      ownProps.history.push('/transactions');
    }
  };
};

const TradesContainer = connect(mapStateToProps, mapDispatchToProps)(Trades);

export default withRouter(TradesContainer);
