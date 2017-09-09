import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setDateSliderValues } from './actions';
import $ from 'jquery';
import './slider.css';
const Timestamp = require('react-timestamp');

const ONE_DAY_STEP = 8.64e7 / 1000;
class RangeSlider extends Component {
	_handleChange = e => {
		this.props.setDateSliderValues({
			currentValue: e.target.value
		});
	};

	render() {
		return (
			<div className="range-slider">
				<div className="text-center">
					<span className="range-slider__value">
						<Timestamp format="date" time={this.props.currentValue} />
					</span>
				</div>
				<span className="range-slider__value">
					<Timestamp format="date" time={this.props.startDate} />
				</span>
				<input
					className="range-slider__range"
					type="range"
					value={this.props.currentValue}
					onChange={this._handleChange}
					min={this.props.startDate}
					max={this.props.endDate}
					step={ONE_DAY_STEP}
				/>
				<span className="range-slider__value">
					<Timestamp format="date" time={this.props.endDate} />
				</span>
			</div>
		);
	}
}

const MapStateToProps = state => {
	const reducer = state.RangeSliderReducer;
	return reducer;
};

export default connect(MapStateToProps, { setDateSliderValues })(RangeSlider);
