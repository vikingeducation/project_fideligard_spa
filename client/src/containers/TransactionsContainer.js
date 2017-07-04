import Transactions from '../components/Transactions'
import { connect } from 'react-redux'
import { setTransactionFilter, setSortOrder, setSortBy } from '../actions/transactions'
import { filterTransactions, sortTransactions, getParams } from '../helpers/transactions'

function filterAndSort(transactions, sortBy, order, filter) {
  let settled = [...transactions]
  if (!transactions) {
    return []
  }
  if (filter) {
    settled = filterTransactions(settled, filter)
  }
  if (sortBy && order) {
    settled = sortTransactions(settled, sortBy, order)
  }
  return settled
}

const mapStateToProps = (state, props) => {
  const params = getParams(props.location.search)
  const sortBy = params.sortBy || state.transactions.sortBy
  const order = parseInt(params.order) || state.transactions.order

  return {
    transactions: filterAndSort(state.transactions.history, sortBy, order, params.filter),
    sortBy: sortBy,
    order: order
  }
}

const mapDispatchToProps = (dispatch, props) => {
  let params = getParams(props.location.search)
  return {
    setFilter: (e) => {
      dispatch(setTransactionFilter(e.target.value))
      props.history.push({ search: '?filter=' + e.target.value })
    },
    sort: (e) => {
      e.preventDefault()
      const filter = params.filter ? `filter=${params.filter}&` : ''
      const sortBy = e.target.getAttribute('data-sort-by')
      let order = parseInt(e.target.getAttribute('data-sort-order'))
      order = order > 0 ? -1 : 1

      props.history.push({
        search: `?${filter}sortBy=${sortBy}&order=${order}`
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Transactions)
