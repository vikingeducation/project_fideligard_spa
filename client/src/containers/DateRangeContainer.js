import { connect } from 'react-redux';
import DateRange from '../components/DateRange';
import { setSlider, getStocks } from '../actions';
import moment from 'moment';
import { getDates } from '../helpers';

const mapStateToProps = (state) => {
  return state.slider;
};

const mapDispatchToState = (dispatch) => {
  return {
    setSlider: (e) => {
      const slider = e.target || e;
      const sliderPos = slider.value / slider.max;
      const pixelPostion = slider.clientWidth * sliderPos;

      const dates = getDates(moment().subtract(1, 'years'), moment());
      const currentValue = parseInt(slider.value, 10);

      const newSliderInfo = {
        value: parseInt(slider.value, 10),
        outputPos: pixelPostion - 30,
        outputText: dates[currentValue - 1]
      };

      dispatch(setSlider(newSliderInfo));
    },

    getStocks: (date) => {
      dispatch(getStocks(date));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToState)(DateRange);
