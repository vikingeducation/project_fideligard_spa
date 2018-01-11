import React, { Component } from 'react';
import PropTypes from 'prop-types';

// change date display onInput but only update page info onMouseUp
class RangeInput extends Component {
  shouldComponentUpdate(nextProps) {
    return !(this.props.value === nextProps.value);
  }

  render() {
    const { ...props } = this.props;

    return (
      <input
        type="range"
        className="form-control"
        {...props}
      />
    );
  }
}

RangeInput.propTypes = {
  name: PropTypes.string.isRequired,
  min: PropTypes.string.isRequired,
  max: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export default RangeInput;
