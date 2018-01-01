import React from 'react';
import { Card, CardHeader, CardBody, CardText } from 'reactstrap';
import NavSelect from './NavSelect';
import { withRouter } from 'react-router-dom';

const Transactions = () => {
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
};

export default withRouter(Transactions);
