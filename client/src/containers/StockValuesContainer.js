import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import StockValues from '../components/StockValues';
import { getStocks, sortStocks, getTradeInfo } from '../actions';
import { sortStockByColumn } from '../helpers';

const mapStateToProps = (state) => {
  const stockInfo = state.stockInfo;
  return {
    stocks: sortStockByColumn(stockInfo),
    isFetching: stockInfo.isFetching,
    error: stockInfo.error,
    selectedDate: state.slider.outputText,
    sortDirection: stockInfo.sortBy.direction,
    sortColumn: stockInfo.sortBy.column
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getStocks: (date) => {
      dispatch(getStocks(date));
    },

    sort: (column) => {
      dispatch(sortStocks(column));
    },

    getTradeInfo: (ticker, e) => {
      e.preventDefault();
      dispatch(getTradeInfo(ticker));

      // send user to trade screen
      ownProps.history.push('/trade');
    }
  };
};

const StockValuesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StockValues);

export default withRouter(StockValuesContainer);
