import React from 'react'
import { Form, FormGroup, Input, Label, Col } from 'reactstrap'

const DatePicker = ({ min, max, current, onChange }) => {
  return (
    <Form>
    <FormGroup row>
    <Label for="currentdate" sm={2} md={3}>Select a Date:</Label>
    <Col sm={10} md={9}>
  <Input type="date" min={min} max={max}name="currentDate" value={current} onChange={onChange}/>
    </Col>
  </FormGroup>
</Form>
  )
}

export default DatePicker
