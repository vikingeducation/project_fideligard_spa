import { connect } from 'react-redux'
import Portfolio from '../components/Portfolio'
import { setOrder } from '../actions/portfolio'
import { groupByStock } from '../helpers/transactions'


const mapStateToProps = (state) => {
  const grouped = groupByStock(state.transactions.history, state.dates.current)
  return {
    allPrices: state.stocks.prices || null,
    dates: state.stocks.dateKeys,
    transactions: grouped,
    symbols: Object.keys(grouped) || [],
    order: state.portfolio.order,
    balance: state.account.balance,
    isFetching: state.stocks.isFetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sort: (e) => {
      e.preventDefault()
      dispatch(setOrder(e.target.getAttribute('data-sort-order')))
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps)(Portfolio)
