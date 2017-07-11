import React from 'react';
import { Col, Panel } from "react-bootstrap";

const Failure = () => {
  return (
    <Col md={6}>
      <Panel header="Trade Result" bsStyle="danger">
        Something went wrong. Please try again.
      </Panel>
    </Col>
  )
};

export default Failure;