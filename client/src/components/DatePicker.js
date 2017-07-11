import React, {Component} from 'react';
import {Panel} from 'react-bootstrap';
import DatePickerInput from './DatePickerInput';
import serialize from "form-serialize";
const MIN_DATE_UNIX_TS = 942883200000;
const MAX_DATE_UNIX_TS = 1499385600000;
const MAX_DATE = "2017-07-07"
const MIN_DATE = "1999-11-18"
const ONE_DAY_SECS = 86400;

class DatePicker extends Component {
  constructor() {
    super()
    this.state = {
      date: MIN_DATE,
      dateInSeconds: MIN_DATE_UNIX_TS,
      isEditOpen: false
    }
  }

  _handleNewDate(date, dateInSeconds) {
    if (!date) {
      this.setState({
        isEditOpen: false
      })
      return;
    }

    if (dateInSeconds > MAX_DATE_UNIX_TS) {
      date = MAX_DATE;
      dateInSeconds = MAX_DATE_UNIX_TS;
    }
    if (dateInSeconds < MIN_DATE_UNIX_TS) {
      date = MIN_DATE;
      dateInSeconds = MIN_DATE_UNIX_TS;
    }

    this.setState({
      date,
      dateInSeconds,
      isEditOpen: false
    });

    this.props.setDate(date);
    this.props.getStocks(this.props.stockWatchlist, date);
  }

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

  onChange = e => {
    let date = new Date(+e.target.value);
    let formattedDate = date.toISOString().slice(0,10);
    this.setState({
      date: formattedDate,
      dateInSeconds: +e.target.value,
      isEditOpen: false
    });
  };

  onEditBlur = e => {
    e.preventDefault();
    const form = e.currentTarget;
    let date = serialize(form, {hash: true}).date;
    let dateInSeconds = new Date(date).getTime();

    this._handleNewDate(date, dateInSeconds);
  };

  onEditSubmit = e => {
    e.preventDefault();
    console.log(e);
    const form = e.target;
    let date = serialize(form, {hash: true}).date;
    let dateInSeconds = new Date(date).getTime();

    this._handleNewDate(date, dateInSeconds);
  };

  onEditMouseUp = e => {
    let date = new Date(+e.target.value);
    let formattedDate = date.toISOString().slice(0,10);
    this.props.setDate(formattedDate);
    this.props.getStocks(this.props.stockWatchlist, formattedDate);
  };

  render() {
    const {date, isEditOpen, dateInSeconds} = this.state;
    return (
      <Panel header="Select a date">
          <h4>
            <a onClick={this.toggleEdit} className="date-picker-display">
              {date}
            </a>
          </h4>
          <DatePickerInput
            isOpen={isEditOpen}
            onSubmit={this.onEditSubmit}
            onBlur={this.onEditBlur}
          />
          <input
            // add onMouseUp for api updating with the date-picker!
            className="date-picker-slider"
            min={MIN_DATE_UNIX_TS}
            max={MAX_DATE_UNIX_TS}
            onMouseUp={this.onEditMouseUp}
            onChange={this.onChange}
            value={dateInSeconds}
            step={ONE_DAY_SECS}
            type="range"
          />
      </Panel>
    );
  }
}

export default DatePicker;