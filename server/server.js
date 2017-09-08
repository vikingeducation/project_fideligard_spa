const express = require("express");
const app = express();
require("dotenv").config();

// https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?date.gte=20150101&date.lt=20160101&api_key=[api key goes here]

app.listen(3001, () => {
	console.log("Server is now listening...");
});
