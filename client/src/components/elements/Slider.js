import React from "react";
import PropTypes from "prop-types";
import { displayDate } from "../../helpers/helper";

const Slider = ({ startDate, endDate, stepper, label, value, ...rest }) => {
  const oneDay = 1000 * 60 * 60 * 24;
  if (!startDate) {
    startDate = new Date("10-01-17");
  }
  if (!endDate) {
    endDate = new Date("11-10-17");
  }
  if (!stepper) {
    stepper = oneDay;
  }
  return (
    <div className="slider">
      <label htmlFor="sliderSelector">{label}</label>
      <br />
      {displayDate(startDate)}
      <input
        type="range"
        step={stepper}
        min={Number(startDate)}
        max={Number(endDate) + oneDay}
        id="sliderSelector"
        value={Number(value)}
        {...rest}
      />
      {displayDate(endDate)}
    </div>
  );
};

Slider.propTypes = {
  startDate: PropTypes.any,
  endDate: PropTypes.any,
  stepper: PropTypes.number
};

export default Slider;
