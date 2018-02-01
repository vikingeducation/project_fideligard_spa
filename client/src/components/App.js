import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import Header from './Header';
import StockValuesContainer from '../containers/StockValuesContainer';
import DateRangeContainer from '../containers/DateRangeContainer';
import PortfolioContainer from '../containers/PortfolioContainer';
import TradeContainer from '../containers/TradeContainer';
import TransactionsContainer from '../containers/TransactionsContainer';

class App extends PureComponent {
  constructor(props) {
    super(props);
    const { history, onPageChange } = this.props;

    history.listen(() => {
      onPageChange();
    });
  }

  render() {
    return (
      <ScrollToTop>
        <Header />
        <div className="App container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-4">
              <StockValuesContainer />
            </div>
            <div className="col-lg-8">
              <DateRangeContainer />
              <Switch>
                <Redirect exact from='/' to='/portfolio'/>
                <Route path="/portfolio" component={PortfolioContainer} />
                <Route path="/trade" component={TradeContainer} />
                <Route path="/transactions" component={TransactionsContainer} />
                <Route render={() => <h1 className="text-center">404 - Page Not Found</h1>} />
              </Switch>
            </div>
          </div>
        </div>
      </ScrollToTop>
    );
  }
}

App.propTypes = {
  history: PropTypes.object.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default App;
