import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Grid, Row, Col } from "react-bootstrap";
import ScrollToTop from "./ScrollToTop";
import Navigation from "./Navigation";
import StockDataContainer from "../containers/StockDataContainer";
import DatePickerContainer from "../containers/DatePickerContainer";
import TradesContainer from "../containers/TradesContainer";
import TransactionsContainer from "../containers/TransactionsContainer";
import PortfolioContainer from "../containers/PortfolioContainer";
import Failure from "./Failure";
import Success from "./Success";

class App extends Component {
  render() {
    return (
      <Router>
        <ScrollToTop>
          <Navigation title={"Fideligard"} />
          <Grid fluid>
            <Row>
              <h1>Fideligard</h1>
              <Col md={5} mdOffset={1} xs={12}>
                <DatePickerContainer />
                <StockDataContainer />
              </Col>
              <Switch>
                <Route path="/trades" component={TradesContainer} />
                <Route path="/transactions" component={TransactionsContainer} />
                <Route path="/portfolio" component={PortfolioContainer} />
                <Route path="/failure" component={Failure} />
                <Route path="/success" component={Success} />
                <Route exact path="/" component={PortfolioContainer} />
              </Switch>
            </Row>
          </Grid>
        </ScrollToTop>
      </Router>
    );
  }
}

export default App;
