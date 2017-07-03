import Trade from '../components/Trade'
import { connect } from 'react-redux'
import { createTransaction } from '../actions/transactions'
import { setStock, setQuantity } from '../actions/trade'
import serialize from 'form-serialize'


function getStockPrice(prices, stock, date) {
  if (!prices || !stock || !date) {
    return ''
  }
  if (prices.hasOwnProperty(stock)) {
    return prices[stock][date]
  }
  return ''
}

const mapStateToProps = (state, props) => {
  console.log('TradeContainer', state, props.location.search.split('=')[1], props)
  return {
    symbols: state.stocks.symbols || [],
    stock: props.location.search.split('=')[1],
    minDate: state.dates.min,
    maxDate: state.dates.max,
    price: getStockPrice(state.stocks.prices, props.location.search.split('=')[1], state.dates.current),
    currentDate: state.dates.current,
    quantity: state.trade.quantity,
    balance: state.account.balance
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSubmit: (e) => {
      e.preventDefault()
      const form = e.target
      const data = serialize(e.target, { hash: true, disabled: true })
      dispatch(createTransaction(data))
      props.history.push('/trade/success')
    },
    updateSymbol: (e) => {
      props.history.push('/trade/?symbol=' + e.target.value)
      dispatch(setStock(e.target.value))
    },
    updateQuantity: (e) => {
      dispatch(setQuantity(e.target.value))
    }

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Trade)
