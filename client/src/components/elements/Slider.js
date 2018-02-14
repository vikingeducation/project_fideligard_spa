import React from "react";
import PropTypes from "prop-types";
import { inputDate } from "../../helpers/helper";

const Slider = ({ startDate, endDate, stepper, label, value, ...rest }) => {
  let inputValue = inputDate(value);

  return (
    <div className="slider">
      <br />

      <input type="date" id="sliderSelector" value={inputValue} {...rest} />
      <br />
    </div>
  );
};

Slider.propTypes = {
  startDate: PropTypes.any,
  endDate: PropTypes.any,
  stepper: PropTypes.number
};

export default Slider;
