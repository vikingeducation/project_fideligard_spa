import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import DatePickerContainer from '../containers/DatePickerContainer'
import StocksContainer from '../containers/StocksContainer'
import TradeContainer from '../containers/TradeContainer'
import SuccessContainer from '../containers/SuccessContainer'
import TransactionsContainer from '../containers/TransactionsContainer'
import PortfolioContainer from '../containers/PortfolioContainer'
import NotFound from './NotFound'
import Navbar from './Navbar'
import ScrollToTop from './ScrollToTop'

class App extends Component {
  render() {
    return (
      <Router>
      <ScrollToTop>
      <div className="container-fluid">
      <Navbar title="Fideligard" />
      <div className="row">
      <div className="col-md-4">
      <StocksContainer />
      </div>
      <div className="col-md-8">
      <DatePickerContainer />
      <hr />
      <Switch>
      <Route exact path="/trade/success" component={SuccessContainer} />
      <Route path="/transactions" component={TransactionsContainer} />
      <Route path="/portfolio" component={PortfolioContainer} />
      <Redirect exact from='/' to='/trade' />
      <Route exact path="/trade" component={TradeContainer} />
      <Route path="/" component={NotFound} />
    </Switch>
      </div>
      </div>
      </div>
      </ScrollToTop>
     </Router>
    );
  }
}

export default App;
