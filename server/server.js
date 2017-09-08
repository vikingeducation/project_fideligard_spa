const express = require("express");
const app = express();
require("dotenv").config();
const fetch = require("node-fetch");

const BASE_URL = "https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json";
const API_KEY = process.env.API_KEY;
const STOCK_LIST =
	"AAPL,FB,GOOGL,PCLN,AMZN,CMG,HOG,ZEUS,BUD,LUV,LVB,GRR,COOL,FIZZ,BOOM";

// https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?date.gte=20150101&date.lt=20160101&api_key=[api key goes here]

const parseJSON = prices => {
	//prices === array
	let obj = {};
	prices.map(price => {
		obj[price[1]] = obj[price[1]] || {};
		obj[price[1]][price[0]] = price[2];
	});

	let date = new Date("2015", "02", "01");
	let keyString;

	for (let i = 0; i < 364; i++) {
		let newdate = new Date(date);

		newdate.setDate(newdate.getDate() + i);
		keyString = newdate.toISOString().split("T")[0];
		console.log(keyString);
	}
	return obj;

	//  var date = new Date('2011','01','02');
	// var newdate = new Date(date);

	// newdate.setDate(newdate.getDate() - 7); // minus the date

	// var nd = new Date(newdate);
};

app.get("/api/prices", async (req, res) => {
	try {
		let response = await fetch(
			`${BASE_URL}?date.gte=20150101&date.lte=20151231&ticker=${STOCK_LIST}&qopts.columns=ticker,date,close&api_key=${API_KEY}`
		);
		let prices = await response.json();
		res.json(parseJSON(prices.datatable.data));
	} catch (error) {
		console.log(error);
	}
});

app.listen(3001, () => {
	console.log("Server is now listening...");
});
