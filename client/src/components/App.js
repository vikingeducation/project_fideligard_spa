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

class App extends Component {
  render() {
    return (
      <Router>
      <div className="container-fluid">
      <h1>Fideligard</h1>
      <div className="row">
      <div className="col-md-4">
      <StocksContainer />
      </div>
      <div className="col">
      <DatePickerContainer />
      <hr />
      <Switch>
      <Route exact path="/trade/success" component={SuccessContainer} />
      <Redirect exact from='/' to='/trade' />
      <Route exact path="/trade" component={TradeContainer} />
    </Switch>
      </div>
      </div>
      </div>
     </Router>
    );
  }
}

export default App;
