import { connect } from 'react-redux';
import Portfolio from '../components/Portfolio';
import { sortPortfolio, getPortfolio, getTradeInfo } from '../actions';
import { sortStockByColumn } from '../helpers';

const mapStateToProps = (state) => {
  const portfolio = state.portfolio;

  return {
    cash: state.portfolio.cash,
    investments: sortStockByColumn(portfolio),
    transactions: portfolio.transactions,
    isFetching: portfolio.isFetching,
    error: portfolio.error,
    sortDirection: portfolio.sortBy.direction,
    sortColumn: portfolio.sortBy.column
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPortfolio: () => {
      dispatch(getPortfolio());
    },

    sort: (column) => {
      dispatch(sortPortfolio(column));
    },

    getTradeInfo: (ticker, e) => {
      e.preventDefault();
      dispatch(getTradeInfo(ticker));

      // send user to trade screen
      ownProps.history.push('/trade');
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
