import React from "react";
import { Header, Segment } from "semantic-ui-react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Page from "./Page";
import NotFound from "./elements/NotFound";

const App = () => (
  <div>
    <Segment>
      <Header as="h1" textAlign="center">
        Fideligard
      </Header>
    </Segment>
    <Router>
      <Switch>
        <Redirect exact from="/" to="/portfolio" />
        <Route path="/:type" component={Page} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </div>
);

export default App;
