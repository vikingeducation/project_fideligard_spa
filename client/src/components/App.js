import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Grid, Row, Col } from "react-bootstrap";
import ScrollToTop from "./ScrollToTop";
import Navigation from "./Navigation";
import StockDataContainer from "../containers/StockDataContainer";
import DatePickerContainer from "../containers/DatePickerContainer";
import TradesContainer from "../containers/TradesContainer";
import Transactions from "./Transactions";
import Portfolio from "./Portfolio";

class App extends Component {
  render() {
    return (
      <Router>
        <ScrollToTop>
          <Navigation title={"Fideligard"} />
          <Grid>
            <Row>
              <h1>Fideligard</h1>
              <Col md={6}>
                <DatePickerContainer />
                <StockDataContainer />
              </Col>
              <Switch>
                <Route path="/trades" component={TradesContainer} />
                <Route path="/transactions" component={Transactions} />
                <Route path="/portfolio" component={Portfolio} />
                <Route exact path="/" component={Portfolio} />
              </Switch>
            </Row>
          </Grid>
        </ScrollToTop>
      </Router>
    );
  }
}

export default App;
