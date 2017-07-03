import React from 'react'
import Input from './elements/Input'
import Form from './Form'
import InputGroup from './elements/InputGroup'

const DatePicker = ({ min, max, current, onChange }) => {
  return (
    <Form inline={true}>
 <InputGroup name="currentDate" text="Select a Date:">
  <Input type="date" min={min} max={max}name="currentDate" value={current} onChange={onChange}/>
  </InputGroup>
</Form>
  )
}

export default DatePicker
