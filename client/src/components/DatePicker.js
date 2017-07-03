import React from 'react'
import Input from './elements/Input'
import Form from './Form'

const DatePicker = ({ min, max, current, onChange }) => {
  return (
    <Form inline={true}>
  <label htmlFor="currentDate" className="mr-2">
  Select a date:</label>
  <Input type="date" min={min} max={max}name="currentDate" value={current} onChange={onChange}/>
</Form>
  )
}

export default DatePicker
