import { connect } from "react-redux";
import App from "../App.js";
import { getStocks, setDate } from "../actions";

const mapStateToProps = state => {
	return state;
};

const mapDispatchToProps = dispatch => {
	return {
		getStocks: () => {
			return Promise.resolve(dispatch(getStocks()));
		},
		setDate: date => {
			dispatch(setDate(date));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
