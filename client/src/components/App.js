import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Grid, Row, Col} from 'react-bootstrap';
import ScrollToTop from "./ScrollToTop";
import Navigation from './Navigation';
import StockDataContainer from '../containers/StockDataContainer';
import Trades from './Trades';
import Transactions from './Transactions';
import Portfolio from './Portfolio';
import DatePicker from './DatePicker';

class App extends Component {
  render() {
    return (
      <Router>
        <ScrollToTop>
          <Navigation title={"Fideligard"}/>
          <Grid>
            <Row>
              <h1>Fideligard</h1>
              <Col md={6}>
                <StockDataContainer />
              </Col>
              <Switch>
                <Route path="/trades" component={Trades} />
                <Route path="/transactions" component={Transactions} />
                <Route path="/portfolio" component={Portfolio} />
                <Route exact path="/" component={Portfolio} />
              </Switch>
            </Row>
            <DatePicker />
          </Grid>
        </ScrollToTop>
      </Router>
    );
  }
}

export default App;
