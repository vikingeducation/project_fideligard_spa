import { connect } from "react-redux";
import Filter from "../components/Filter";
import serialize from "form-serialize";
import { setFilter, resetFilter, addStockToList, getStocks } from "../actions";

const mapStateToProps = state => {
  return {
    stockWatchlist: state.stockWatchlist
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setFilter: e => {
      e.preventDefault();
      const form = e.target;
      const stock = serialize(form, { hash: true }).symbol;
      if (!ownProps.stockWatchlist.includes(stock)) {
        dispatch(addStockToList(stock));
        dispatch(getStocks([...ownProps.stockWatchlist, stock], ownProps.date));
      }
      dispatch(setFilter(stock));
    },
    resetFilter: e => {
      e.preventDefault();
      e.target.parentNode.parentNode.parentNode.reset();
      dispatch(resetFilter());
    }
  };
};

const FilterContainer = connect(mapStateToProps, mapDispatchToProps)(Filter);

export default FilterContainer;
