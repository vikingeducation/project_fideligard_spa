import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from 'react-router-dom'
import Navbar from './Navbar'
import DateWidget from './DateWidget'
import StockContainer from '../containers/StockContainer'
import TradeContainer from '../containers/TradeContainer'
import TransactionsContainer from '../containers/TransactionsContainer'
import PortfolioPanel from './PortfolioPanel'
import { connect } from 'react-redux'

const App = () => (
  <div>
    <Router>
      <div>
        <Navbar />
        <div>
          <div className="row">
            <div className="col">
              <StockContainer />
            </div>
            <div className="col">
              <DateWidget />
              <Switch>
                <Route
                  exact="exact"
                  path="/portfolio"
                  component={PortfolioPanel}
                />
                <Route
                  exact="exact"
                  path="/transactions"
                  component={TransactionsContainer}
                />
                <Route
                  exact="exact"
                  path="/trade/:ticker"
                  component={TradeContainer}
                />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </Router>
  </div>
)

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App)

export default AppContainer
