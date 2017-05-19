import React from "react";
// import { InputGroup, Input } from "reactstrap";

const DateSlider = ({ changeDate, date }) => {
  return (
    <div className="form-group">
      <input
        onChange={changeDate}
        className="form-control"
        type="date"
        min="2017-05-01"
        max="2017-05-18"
        value={date}
      />
    </div>
  );
};

export default DateSlider;
