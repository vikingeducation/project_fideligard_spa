import React, {Component} from 'react';
import {Grid} from 'react-bootstrap';
import DatePickerInput from './DatePickerInput';
import serialize from "form-serialize";
const MIN_DATE_UNIX_TS = 345427200000;
const MAX_DATE_UNIX_TS = 1499385600000; // July 7, 2017
const MAX_DATE = "2017-07-07"
const ONE_DAY_SECS = 86400;

class DatePicker extends Component {
  constructor() {
    super()
    this.state = {
      date: "1980-12-12",
      dateInSeconds: MIN_DATE_UNIX_TS,
      isEditOpen: false
    }
  }

  onChange = e => {
    let date = new Date(+e.target.value);
    let formattedDate = date.toISOString().slice(0,10);
    this.setState({
      date: formattedDate,
      dateInSeconds: +e.target.value
    });
  };

  toggleEdit = e => {
    e.preventDefault();
    if (this.state.isEditOpen) {
      this.setState({
        isEditOpen: false
      });
    } else {
      this.setState({
        isEditOpen: true
      });
    }
  };

  onEditSubmit = e => {
    e.preventDefault();
    const form = e.target;
    let date = serialize(form, {hash: true}).date;
    let dateInSeconds = new Date(date).getTime();
    if (dateInSeconds > MAX_DATE_UNIX_TS) {
      date = MAX_DATE;
      dateInSeconds = MAX_DATE_UNIX_TS;
    }
    this.setState({
      date,
      dateInSeconds,
      isEditOpen: false
    })
  };

  render() {
    const {date, isEditOpen, dateInSeconds} = this.state;
    return (
      <Grid>
        <h4>
          <a 
            onClick={this.toggleEdit}
            className="date-picker-display"
          >
            {date}
          </a>
        </h4>
        <DatePickerInput
          isOpen={isEditOpen}
          onSubmit={this.onEditSubmit}
        />
        <input 
          min={MIN_DATE_UNIX_TS}
          max={MAX_DATE_UNIX_TS}
          onChange={this.onChange}
          value={dateInSeconds}
          step={ONE_DAY_SECS}
          type="range"
        />
      </Grid>
    );
  }
}

export default DatePicker;