import React from 'react'
import { connect } from 'react-redux'
import Navigation from '../components/Navigation'
import { Link } from 'react-router-dom'

const mapStateToProps = (state, props) => {
  console.log('succssContinear', props)
  return {
    trade: state.transactions.history[state.transactions.history.length - 1] || {},
    balance: state.account.balance,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const Success = ({ trade, balance, history }) => {

  return (
    <section id="success">
    <h2 className="inline-block">Success</h2>
    <Navigation className="float-right" history={history} />
    <p>Stock: {trade.symbol}</p>
    <p>Transaction type: {trade.type}</p>
    <p>Price: ${trade.price}</p>
    <p>Quantity: {trade.quantity}</p>
    <p>Remaining Balance: ${balance.toLocaleString()}</p>
    <Link to="/">Make another trade</Link>
    </section>

  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Success)
