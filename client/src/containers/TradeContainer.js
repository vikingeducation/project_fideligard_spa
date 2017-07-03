import React, { Component } from 'react'
import Trade from '../components/Trade'
import { connect } from 'react-redux'
import { createTransaction } from '../actions/transactions'
import { updateBalance } from '../actions/account'
import { setCurrentDate } from '../actions/dates'
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
  return {
    symbols: state.stocks.symbols || [],
    stock: props.location.search.split('=')[1],
    minDate: state.dates.min,
    maxDate: state.dates.max,
    price: getStockPrice(state.stocks.prices, props.location.search.split('=')[1], state.dates.current),
    currentDate: state.dates.current,
    quantity: state.trade.quantity,
    balance: state.account.balance,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSubmit: (e) => {
      e.preventDefault()
      let data = serialize(e.target, { hash: true, disabled: true })
      data.quantity = parseInt(data.quantity)
      data.price = parseFloat(data.price)
      let amount = data.price * data.quantity
      amount = data.type === 'BUY' ? amount * -1 : amount
      if (!isNaN(amount)) {
        dispatch(updateBalance(amount))
        dispatch(createTransaction(data))
        props.history.push('/trade/success')
      } else {
        props.history.push('/trade')
      }
    },
    updateSymbol: (e) => {
      props.history.push('/trade/?symbol=' + e.target.value)
      dispatch(setStock(e.target.value))
    },
    updateQuantity: (e) => {
      dispatch(setQuantity(e.target.value))
    },
    updateCurrentDate: (e) => {
      dispatch(setCurrentDate(e.target.value))
    }
  }
}

class TradeContainer extends Component {

  componentDidMount() {
    this.props.history.push('/trade/?symbol=A')
  }

  render() {
    return (<Trade {...this.props} />)
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps)(TradeContainer)
