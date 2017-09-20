import React from "react";
import moment from "moment";

let dateMax = moment().subtract(1, "day").format("YYYY-MM-DD");

const DateSlider = ({ changeDate, date }) => {
  return (
    <div className="form-group">
      <input
        onChange={changeDate}
        className="form-control"
        type="date"
        min="2017-05-01"
        max={dateMax}
        value={date}
      />
    </div>
  );
};

export default DateSlider;
