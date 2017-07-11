import React from 'react';
import {Form, FormGroup, Button, FormControl, Col} from 'react-bootstrap';

const Filter = ({setFilter, resetFilter}) => {
  return (
    <div>
      <Form horizontal className="filter" onSubmit={setFilter}>
        <FormGroup controlId="filter">
          <Col md={8}>
          <FormControl type="text" name="symbol" placeholder="Set by a specific stock"/>
          </Col>
          <Col md={4}>
          <Button bsStyle="success" type="submit">Filter</Button>
          <Button bsStyle="warning" onClick={resetFilter}>Reset</Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
};

export default Filter;