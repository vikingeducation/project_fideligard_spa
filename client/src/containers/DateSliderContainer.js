import { connect } from "react-redux";
import DateSlider from "../components/DateSlider";
import { changeDate } from "../actions/dateAction";

function mapDispatchToProps(dispatch) {
  return {
    changeDate: e => {
      dispatch(changeDate(e.target.value));
    }
  };
}

const DateSliderContainer = connect(null, mapDispatchToProps)(DateSlider);
export default DateSliderContainer;
