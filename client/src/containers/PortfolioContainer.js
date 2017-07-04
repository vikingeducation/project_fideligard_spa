import { connect } from 'react-redux'
import Portfolio from '../components/Portfolio'
import { setOrder } from '../actions/portfolio'
import { getDaysAgo } from '../helpers/dates'
import {groupByStock} from '../helpers/transactions'

// function groupByStock(transactions) {
  //   let grouped = {}
  //   transactions.forEach((trans) => {
  //     if (!grouped[trans.symbol]) {
  //       grouped[trans.symbol] = {}
  //     }
  //     let stock = grouped[trans.symbol]
  //     let isPurchase = trans.type === 'BUY'
  //     stock.quantity = (stock.quantity || 0) + (isPurchase ? trans.quantity : trans.quantity * -1)
  //     stock.costBasis = (stock.costBasis || 0) + (trans.quantity * trans.price * (isPurchase ? 1 : -1))
  //   })
  //   return grouped
  // }



const mapStateToProps = (state) => {
  const grouped = groupByStock(state.transactions.history)
  return {
    currentDate: getDaysAgo(state.dates.current),
    allPrices: state.stocks.prices,
    dateKeys: state.stocks.dates || [],
    transactions: grouped,
    symbols: Object.keys(grouped),
    order: state.portfolio.order,
    balance: state.account.balance
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
