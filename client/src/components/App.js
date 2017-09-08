import React from "react";
import { Header, Segment, Grid } from "semantic-ui-react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Page from "./Page";

const App = () => (
  <div>
    <Segment>
      <Header as="h1" textAlign="center">
        Fideligard
      </Header>
    </Segment>
    <Grid>
      <Router>
        <Switch>
          <Redirect exact from="/" to="/portfolio" />
          <Route path="/:type" component={Page} />
          <Route />
          <Route />
        </Switch>
      </Router>
    </Grid>
  </div>
);

export default App;
