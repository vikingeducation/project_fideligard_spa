import React from "react";

const DateSlider = ({ changeDate, date }) => {
  return (
    <div className="form-group">
      <input
        onChange={changeDate}
        className="form-control"
        type="date"
        min="2017-05-01"
        max="2017-05-27"
        value={date}
      />
    </div>
  );
};

export default DateSlider;
