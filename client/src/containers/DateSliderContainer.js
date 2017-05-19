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

function mapStateToProps(state) {
  return {
    date: state.date
  };
}

const DateSliderContainer = connect(mapStateToProps, mapDispatchToProps)(
  DateSlider
);
export default DateSliderContainer;
