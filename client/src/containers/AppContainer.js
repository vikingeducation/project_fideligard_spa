import React, { Component } from "react";
import { connect } from "react-redux";
import App from "../App.js";
import { getStocks } from "../actions";

const mapStateToProps = state => {
	return state;
};

const mapDispatchToProps = dispatch => {
	return {
		getStocks: () => {
			return Promise.resolve(dispatch(getStocks()));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
