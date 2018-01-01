import React from 'react';
import { Card, CardHeader, CardBody, CardText } from 'reactstrap';
import NavSelect from './NavSelect';
import { withRouter } from 'react-router-dom';

const Trade = () => {
  return (
    <Card className="Trade">
      <CardHeader>
        <h3 className="PageTitle">Trade</h3>
        <NavSelect />
      </CardHeader>
      <CardBody>
        <CardText>Trade Info goes here</CardText>
      </CardBody>
    </Card>
  );
};

export default withRouter(Trade);
