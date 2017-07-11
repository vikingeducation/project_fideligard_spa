import { connect } from "react-redux";
import DatePicker from '../components/DatePicker';
import {setDate, getStocks, getSpecificStock} from '../actions';

const mapStateToProps = state => {
  return {
    stockWatchlist: state.stockWatchlist,
    specificStock: state.specificStockData.stock
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setDate: (date) => {
      dispatch(setDate(date));
    },
    updateStocks: (stocks, specificStock, date) => {
      dispatch(getStocks(stocks, date));
      dispatch(getSpecificStock(specificStock, date));
    }
  }
};

const DatePickerContainer = connect(mapStateToProps, mapDispatchToProps)(DatePicker);

export default DatePickerContainer;