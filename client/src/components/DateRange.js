import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RangeInput from './elements/RangeInput';
import { Card, CardHeader } from 'reactstrap';
import moment from 'moment';

class DateRange extends Component {
  componentDidMount() {
    const rangeInput = document.getElementsByName('date')[0];
    this.props.setSlider(rangeInput);
  }

  render() {
    const { max, min, value, outputPos, setSlider, outputText } = this.props;

    return (
      <Card className="DateRange">
        <CardHeader className="DateRangeSlider">
          <span className="StartDate">{moment().subtract(1, 'years').calendar()}</span>
          <span className="EndDate">{moment().format('L')}</span>
          <output htmlFor="date" className="text-success" id="dateOutput" style={{left: outputPos}}>
            {outputText}
          </output>
          <RangeInput
            name="date"
            min={`${ min }`}
            max={`${ max }`}
            value={value}
            onChange={setSlider}
          />
        </CardHeader>
      </Card>
    );
  }
}

DateRange.propTypes = {
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  outputPos: PropTypes.number.isRequired,
  setSlider: PropTypes.func.isRequired,
  outputText: PropTypes.string.isRequired
};

export default DateRange;
