import { connect } from "react-redux";
import App from "../App.js";
import {
	getStocks,
	setDate,
	createTransaction,
	updatePortfolio,
	updateBalance
} from "../actions";

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
		},
		createTransaction: data => {
			dispatch(createTransaction(data));
		},
		updatePortfolio: data => {
			dispatch(updatePortfolio(data));
		},
		updateBalance: amount => {
			dispatch(updateBalance(amount));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
