import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardText } from 'reactstrap';

class StockValues extends Component {
  render() {
    return (
      <Card className="StockValues">
        <CardHeader tag="h3">Stocks</CardHeader>
        <CardBody>
          <CardText>Stocks Table from API</CardText>
        </CardBody>
      </Card>
    );
  }
}

export default StockValues;
