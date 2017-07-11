import React, { Component } from "react";
import { Form, Col, Panel, FormControl, Button } from "react-bootstrap";

const Transactions = ({transactions}) => {
  if (transactions.length === 0) {
    return (
      <Col md={6}>
        <Panel header="Transactions">
          No transactions found.
        </Panel>
      </Col>
    )
  }
  return (
    <Col md={6}>
      <Panel header="Transactions">
        {transactions.length}
      </Panel>
    </Col>
  );
};

export default Transactions;
