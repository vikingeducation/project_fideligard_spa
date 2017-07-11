import React from "react";
import { Col, Panel } from "react-bootstrap";

const Success = () => {
  return (
    <Col md={6}>
      <Panel header="Trade Result" bsStyle="success">
        Your transaction was successful.
      </Panel>
    </Col>
  );
};

export default Success;
