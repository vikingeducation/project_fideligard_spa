import React from 'react';
import { Card, CardHeader, CardBody, CardText } from 'reactstrap';

const StockValues = () => {
  return (
    <Card className="StockValues">
      <CardHeader tag="h3">Stocks</CardHeader>
      <CardBody>
        <CardText>Stocks Table from API</CardText>
      </CardBody>
    </Card>
  );
};

export default StockValues;
