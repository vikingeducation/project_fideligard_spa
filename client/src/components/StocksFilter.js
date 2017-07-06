import React from 'react'
import { Form, Input, FormGroup, Label, Col } from 'reactstrap'

const StocksFilter = ({ onChange }) => {
  return (
    <Form className="float-md-right">
   <FormGroup row>
      <Label for="filter" sm={3}>Filter: </Label>
      <Col sm={9}>
           <Input type="text" onChange={onChange}/>
           </Col>
   </FormGroup>
      </Form>)
}

export default StocksFilter
