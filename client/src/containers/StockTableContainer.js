import { connect } from "react-redux";
import StockTable from "../components/StockTable";
import {
  setSortAscending,
  setSortDescending,
  getSpecificStock
} from "../actions";

const mapStateToProps = (state, ownProps) => {
  return {
    stockData: state.stockData,
    filter: state.stockFilter,
    sortDirection: state.sortDirection
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setSortDirection: e => {
      e.preventDefault();
      if (ownProps.sortDirection === "ascending") {
        dispatch(setSortDescending());
      } else {
        dispatch(setSortAscending());
      }
    },
    onClickTrade: stock => {
      dispatch(getSpecificStock(stock, ownProps.date));
    }
  };
};

const StockTableContainer = connect(mapStateToProps, mapDispatchToProps)(
  StockTable
);

export default StockTableContainer;
