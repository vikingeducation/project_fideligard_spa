import React from 'react'

const DatePicker = ({ min, max, current, onChange }) => {
  return (
    <form className="form-inline">
  <label htmlFor="currentDate" className="mr-2">
  Select a date:</label>
  <input type="date" min={min} max={max} className="form-control" name="currentDate" value={current} onChange={onChange}/>
</form>
  )
}

export default DatePicker
