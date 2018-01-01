import React, { Component } from 'react';
import RangeInput from './elements/RangeInput';
import { Card, CardHeader } from 'reactstrap';
import { setSliderOutput, setSliderToToday } from './helpers/slider';
import moment from 'moment';


class DateRange extends Component {
  componentDidMount() {
    setSliderToToday();
  }

  render() {
    return (
      <Card className="DateRange">
        <CardHeader className="DateRangeSlider">
          <span className="StartDate">{moment().subtract(1, 'years').calendar()}</span>
          <span className="EndDate">{moment().format('L')}</span>
          <output htmlFor="date" className="text-muted" id="dateOutput"></output>
          <RangeInput name="date" min="1" max="366" onChange={setSliderOutput} />
        </CardHeader>
      </Card>
    );
  }
}

export default DateRange;
