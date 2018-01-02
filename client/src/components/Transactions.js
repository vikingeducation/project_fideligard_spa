import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardText } from 'reactstrap';
import NavSelect from './NavSelect';
import { withRouter } from 'react-router-dom';

class Transactions extends Component {
  render() {
    return (
      <Card className="Transactions">
        <CardHeader>
          <h3 className="PageTitle">Transactions</h3>
          <NavSelect />
        </CardHeader>
        <CardBody>
          <CardText>Transactions Info goes here</CardText>
        </CardBody>
      </Card>
    );
  }
}

export default withRouter(Transactions);
