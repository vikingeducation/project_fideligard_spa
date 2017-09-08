import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Page from "./Page";
import NotFound from "./elements/NotFound";

const App = () => (
  <Router>
    <Switch>
      <Redirect exact from="/" to="/portfolio" />
      <Route path="/:type" component={Page} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default App;
