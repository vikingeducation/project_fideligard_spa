import React, {Component} from 'react';
import {Grid} from 'react-bootstrap';
import DatePickerInput from './DatePickerInput';
const MIN_DATE_UNIX_TS = 345427200000;
const MAX_DATE_UNIX_TS = 1499385600000; // July 7, 2017
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
    console.log(e.target.value);
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