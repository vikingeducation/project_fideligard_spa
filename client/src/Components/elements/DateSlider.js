import React from "react";
import Input from "./Input";
//TODO: MAKE AN ACTUAL DATE SLIDER

const DateSlider = ({ selectedDate, onChange, ...rest }) => {
  return (
    <Input {...rest} onChange={onChange} type="date" value={selectedDate} />
  );
};
export default DateSlider;
