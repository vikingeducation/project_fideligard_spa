import React from 'react';
import {FormControl, Button} from 'react-bootstrap';

const DatePickerInput = ({isOpen, onSubmit}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <form onSubmit={onSubmit}>
      <FormControl type="date" />
      <Button bsStyle="primary" type="submit">Submit</Button>
    </form>
  );
};

export default DatePickerInput;