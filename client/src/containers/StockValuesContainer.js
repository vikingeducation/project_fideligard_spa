import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import StockValues from '../components/StockValues';
import { getStocks, sortStocks, getTradeInfo } from '../actions';

const sort = (stocks, column, direction) => {
  let sorted;
  switch (direction) {
    case 'NONE':
      sorted = stocks.sort((a, b) => a.code.localeCompare(b.code));
      return sorted.map(stock => {
        return { ...stock, key: stock.code };
      });
    case 'ASC':
      if (column !== 'code') {
        sorted = stocks.sort((a, b) => a[column] - b[column]);
      } else {
        sorted = stocks.sort((a, b) => b.code.localeCompare(a.code));
      }

      return sorted.map(stock => {
        return { ...stock, key: stock.code };
      });
    case 'DESC':
      if (column !== 'code') {
        sorted = stocks.sort((a, b) => b[column] - a[column]);
      } else {
        sorted = stocks.sort((a, b) => a.code.localeCompare(b.code));
      }

      return sorted.map(stock => {
        return { ...stock, key: stock.code };
      });
    default:
      return stocks;
  }
};

const mapStateToProps = (state) => {
  const stockInfo = state.stockInfo;
  return {
    stocks: sort(stockInfo.stocks, stockInfo.sortBy.column, stockInfo.sortBy.direction),
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
