import React, { Component } from 'react'
import Trade from '../components/Trade'
import { connect } from 'react-redux'
import { createTransaction } from '../actions/transactions'
import { updateBalance } from '../actions/account'
import { setCurrentDate } from '../actions/dates'
import { setQuantity, updateFormStatus, setType } from '../actions/trade'
import serialize from 'form-serialize'
import { groupByStock } from '../helpers/transactions'

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
  const stock = props.location.search.split('=')[1]
  return {
    symbols: state.stocks.symbols || [],
    stock: stock,
    minDate: state.dates.min,
    maxDate: state.dates.max,
    price: getStockPrice(state.stocks.prices, stock, 'd0'),
    currentDate: state.dates.current,
    quantity: state.trade.quantity,
    balance: state.account.balance,
    halfFilled: !!state.trade.halfFilled,
    type: state.trade.type || 'BUY',
    portfolio: groupByStock(state.transactions.history, state.dates.current)
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSubmit: (e) => {
      e.preventDefault()
      let data = serialize(e.target, { hash: true, disabled: true })
      data.quantity = parseInt(data.quantity, 10)
      data.price = parseFloat(data.price)

      let cost = data.price * data.quantity
      cost = data.type === 'BUY' ? cost * -1 : cost

      if (!isNaN(cost)) {
        dispatch(updateBalance(cost))
        dispatch(createTransaction(data))
        props.history.push('/trade/success')
      } else {
        props.history.push('/trade')
      }
      dispatch(setQuantity(0))
    },
    updateSymbol: (e) => {
      props.history.push('/trade/?symbol=' + e.target.value)
    },
    updateQuantity: (e) => {
      dispatch(setQuantity(e.target.value))
      dispatch(updateFormStatus(!!e.target.value))
    },
    updateCurrentDate: (e) => {
      dispatch(setCurrentDate(e.target.value))
    },
    updateFormStatus: () => {
      dispatch(updateFormStatus(false))
    },
    setType: (e) => {
      dispatch(setType(e.target.value))
    }
  }
}

class TradeContainer extends Component {

  componentDidMount() {
    let symbol = this.props.location.search.split('=')[1] || 'A'
    this.props.history.push(`/trade/?symbol=${symbol}`)
  }

  render() {
    return (<Trade {...this.props} />)
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps)(TradeContainer)
