import { connect } from "react-redux";
import Trades from '../components/Trades';
// import {setSortAscending, setSortDescending, getSpecificStock} from '../actions';

const mapStateToProps = (state, ownProps) => {
  return {
    stock: state.specificStockData.stock,
    isFetching: state.specificStockData.isFetching
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // setSortDirection: e => {
    //   e.preventDefault();
    //   if (ownProps.sortDirection === "ascending") {
    //     dispatch(setSortDescending());
    //   } else {
    //     dispatch(setSortAscending());
    //   }
    // },
    // onClickTrade: stock => {
    //   dispatch(getSpecificStock(stock, ownProps.date));
    // }
  }
};

const TradesContainer = connect(mapStateToProps, mapDispatchToProps)(Trades);

export default TradesContainer;