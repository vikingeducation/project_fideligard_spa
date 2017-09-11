import { connect } from "react-redux";
import Sidebar from "../components/Sidebar";

const mapStateToProps = state => {
  return {
    sideBarData: state.sideBarData,
    date: state.date,
    stockData: state.stockData
  };
};

export default connect(mapStateToProps, null)(Sidebar);
