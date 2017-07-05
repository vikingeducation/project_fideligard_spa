import React from 'react'
import { connect } from 'react-redux'
import Navigation from '../components/Navigation'
import { Link } from 'react-router-dom'

const mapStateToProps = (state, props) => {
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
    <dl className="row">
    <dt className="col-md-3">Stock</dt>
    <dd className="col-md-9">{trade.symbol}</dd>
    <dt className="col-md-3">Transaction Type:</dt>
    <dd className="col-md-9">{trade.type}</dd>
    <dt className="col-md-3">Price:</dt>
    <dd className="col-md-9">{trade.price.toFixed(2)}</dd>
    <dt className="col-md-3">Quantity:</dt>
    <dd className="col-md-9">{trade.quantity}</dd>
    <dt className="col-md-3">Remaining Balance:</dt>
    <dd className="col-md-9">${balance.toLocaleString()}</dd>
    </dl>
    <p>
      <Link to="/">Make another trade</Link>
    </p>
    <p>
      <Link to="/portfolio">View Portfolio</Link>
    </p>
    <p>
      <Link to="/transactions">View Transaction History</Link>
    </p>
    </section>

  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Success)
