import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardText } from 'reactstrap';
import NavSelect from './NavSelect';
import { withRouter } from 'react-router-dom';

class Portfolio extends Component {
  render() {
    return (
      <Card className="Portfolio">
        <CardHeader>
          <h3 className="PageTitle">Portfolio</h3>
          <NavSelect />
        </CardHeader>
        <CardBody>
          <CardText>Portfolio Info goes here</CardText>
        </CardBody>
      </Card>
    );
  }
}

export default withRouter(Portfolio);
