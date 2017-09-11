import React from 'react';
import Transactions from '../components/Transactions.js'
import Portfolio from '../components/Portfolio.js'
import Trade from '../components/Trade.js'
import {Link, Route, Switch, BrowserRouter as Router} from 'react-router-dom'

const MainBody = ()=>{
  return (
    <Router>
      <div>
        <Link to='/portfolio'>Portfolio </Link>
        <Link to='/transactions'>Transactions </Link>
        <Link to='/trade'>Trade</Link>
        <Switch>
          <Route path="/portfolio" component={Portfolio} />
          <Route path="/transactions" component={Transactions} />
          <Route path="/trade" component={Trade} />
        </Switch>
      </div>
    </Router>
  )
}

export default MainBody;