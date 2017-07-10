import { connect } from "react-redux";
import DatePicker from '../components/DatePicker';
import {setDate, getStocks} from '../actions';

const mapStateToProps = state => {
  return {
    stockWatchlist: state.stockWatchlist,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setDate: (date) => {
      dispatch(setDate(date));
    },
    getStocks: (stocks, date) => {
      dispatch(getStocks(stocks, date));
    }
  }
};

const DatePickerContainer = connect(mapStateToProps, mapDispatchToProps)(DatePicker);

export default DatePickerContainer;