import React, { Component } from 'react'
import { connect } from 'react-redux'
import Stocks from '../components/Stocks'
import { getStockPrices, setFilter, sortSymbols } from '../actions/stocks'


function filterSymbols(symbols, filter) {
  let matched = []
  for (let sym in symbols) {
    if (sym.indexOf(filter.toUpperCase()) > -1) {
      matched.push(sym)
    }
  }
  return matched
}


function filterAndSort(symbols, filter, order) {
  if (!symbols) {
    return
  }
  symbols = filter ? filterSymbols(symbols, filter) : symbols
  symbols = order > 0 ? symbols.sort() : symbols.reverse()
  return symbols
}


const mapStateToProps = (state) => {
  return {
    order: state.stocks.order,
    currentDate: state.dates.current,
    prices: state.stocks.prices,
    symbols: filterAndSort(state.stocks.symbols, state.stocks.filter, state.stocks.order),
    dates: state.stocks.dates
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getStockPrices: (start) => {
      dispatch(getStockPrices(start))
    },
    onChange: (e) => {
      dispatch(setFilter(e.target.value))
    },
    sortSymbols: (e) => {
      e.preventDefault()
      dispatch(sortSymbols(e.target.getAttribute('data-sort-order')))
    }
  }
}

class StocksContainer extends Component {

  componentDidMount() {
    // fetch stock prices
    console.log('StocksContainer did mount')
    this.props.getStockPrices(this.props.currentDate)
  }

  componentDidUpdate(prev) {
    if (prev.currentDate !== this.props.currentDate) {
      console.log('StocksContainer date did update', this.props.currentDate)
        // this.props.getStockPrices(this.props.currentDate)
    }
  }


  render() {
    return (
      <Stocks {...this.props} />
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(StocksContainer)
