import React from 'react';
import {FormControl, Button} from 'react-bootstrap';

const DatePickerInput = ({isOpen, onSubmit}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <form onSubmit={onSubmit} className="date-picker-form">
      <FormControl type="date" name="date" className="date-picker-input" required/>
      <Button bsStyle="primary" type="submit">Submit</Button>
    </form>
  );
};

export default DatePickerInput;