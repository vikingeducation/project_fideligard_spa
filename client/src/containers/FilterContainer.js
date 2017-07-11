import { connect } from "react-redux";
import Filter from '../components/Filter';
import serialize from "form-serialize";
import {setFilter, resetFilter, addStockToList, getStocks} from '../actions';

const mapStateToProps = state => {
  return {
    stockWatchlist: state.stockWatchlist,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setFilter: e => {
      e.preventDefault();
      const form = e.target;
      const stock = serialize(form, {hash: true}).symbol;
      form.reset();
      dispatch(addStockToList(stock));
      dispatch(getStocks([...ownProps.stockWatchlist, stock], ownProps.date));
      dispatch(setFilter(stock));
    }
  }
};

const FilterContainer = connect(mapStateToProps, mapDispatchToProps)(Filter);

export default FilterContainer;