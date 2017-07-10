import React, {Component} from 'react';
import {Grid} from 'react-bootstrap';
const MIN_DATE_UNIX_TS = 345427200000;
const MAX_DATE_UNIX_TS = 1499385600000; // July 7, 2017

class DatePicker extends Component {
  constructor() {
    super()
  }
  onChange = e => {
    console.log(e.target.value);
  };
  render() {
    return (
      <Grid>
        <input onChange={this.onChange} type="range"/>
      </Grid>
    );
  }
}

export default DatePicker;