import { connect } from 'react-redux'
import Portfolio from '../components/Portfolio'
import { setOrder } from '../actions/portfolio'

function aggregateTransactions(transactions) {

  let aggregated = {}
  transactions.forEach((trans) => {
    if (!aggregated[trans.symbol]) {
      aggregated[trans.symbol] = {}
    }
    let stock = aggregated[trans.symbol]
    let isPurchase = trans.type === 'BUY'
    stock.quantity = (stock.quantity || trans.quantity) + (isPurchase ? trans.quantity : trans.quantity * -1)
    stock.costBasis = (stock.costBasis || 0) + (trans.quantity * trans.price * (isPurchase ? 1 : -1))
  })
  return aggregated
}


const mapStateToProps = (state, props) => {
  const aggregated = aggregateTransactions(state.transactions.history)
  return {
    history: props.history,
    currentDate: state.dates.current,
    allPrices: state.stocks.prices,
    dateKeys: state.stocks.dates || [],
    transactions: aggregated,
    symbols: Object.keys(aggregated),
    order: state.portfolio.order
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
