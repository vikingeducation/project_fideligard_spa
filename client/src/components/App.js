import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import Header from './Header';
import StockValues from './StockValues';
import DateRangeContainer from '../containers/DateRangeContainer';
import Portfolio from './Portfolio';
import Trade from './Trade';
import Transactions from './Transactions';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ScrollToTop>
          <Header />
          <div className="App container-fluid">
            <div className="row justify-content-center">
              <div className="col-md-4">
                <StockValues />
              </div>
              <div className="col-md-8">
                <DateRangeContainer />
                <Switch>
                  <Redirect exact from='/' to='/portfolio'/>
                  <Route path="/portfolio" component={Portfolio} />
                  <Route path="/trade" component={Trade} />
                  <Route path="/transactions" component={Transactions} />
                  <Route render={() => <h1 className="text-center">404 - Page Not Found</h1>} />
                </Switch>
              </div>
            </div>
          </div>
        </ScrollToTop>
      </BrowserRouter>
    );
  }
}

export default App;
