import React from 'react';
import PropTypes from 'prop-types';

// change date display onInput but only update page info onMouseUp
const RangeInput = ({ ...props }) => {
  return (
    <input type="range" className="form-control" {...props} />
  );
};

RangeInput.propTypes = {
  name: PropTypes.string.isRequired,
  min: PropTypes.string.isRequired,
  max: PropTypes.string.isRequired,
  onInput: PropTypes.func,
  onMouseUp: PropTypes.func
};

export default RangeInput;
