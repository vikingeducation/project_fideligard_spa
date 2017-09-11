import { connect } from "react-redux";
import { Slider } from "../components/Slider";
import { updateSidebar, setDate } from "../actions";

const mapStateToProps = state => {
  return {
    stockData: state.stockData,
    date: state.date
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSidebarData: (today, stocks, date) => {
      dispatch(updateSidebar(today, stocks, date));
    },
    setDate: date => {
      dispatch(setDate(date));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Slider);
