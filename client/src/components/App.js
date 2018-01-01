import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import Header from './Header';
import StockValues from './StockValues';
import DateRange from './DateRange';
import Portfolio from './Portfolio';
import Trade from './Trade';
import Transactions from './Transactions';

const App = () => {
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
              <DateRange />
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
};

export default App;
