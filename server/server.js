require("isomorphic-fetch");
require("dotenv").config();
const express = require("express");
const app = express();
const moment = require("moment");

const QUANDL_API_KEY = process.env.QUANDL_API_KEY;

app.set("port", process.env.PORT || 3001);

function checkStatus(response) {
    // If response not okay, throw an error
    if (!response.ok) {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
    return response;
}

app.get("/api/quandl/stocks/:date", (req, res, next) => {
    console.log("Getting stocks...");
    let date = moment(req.params.date);
    let day_0 = date.format("YYYYMMDD");
    let day_1 = date.subtract(1, "day").format("YYYYMMDD");
    let day_7 = date.subtract(7, "day").format("YYYYMMDD");
    let day_30 = date.subtract(30, "day").format("YYYYMMDD");

    let promiseArray = [day_0, day_1, day_7, day_30].map(date => {
        return fetch(
            `https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?date=${date}&api_key=${QUANDL_API_KEY}&qopts.columns=date,ticker,close&qopts.per_page=20`
        ).then(checkStatus);
    });

    Promise.all(promiseArray)
        .then(responses => {
            return Promise.all(responses.map(response => response.json()));
        })
        .then(stocksArray => {
            console.log(JSON.stringify(stocksArray, null, 2));

            let frontEndStocks = {
                date: day_0,
                stocks: []
            };

            // stock = {
            //     Day0Price: Number,
            //     Day1Price: Number,
            //     Day7Price: Number,
            //     Day30Price: Number,
            //     Symbol: ""
            // }
            let daysInfo = ["day_0", "day_1", "day_7", "day_30"];
            let stocks = [];
            for (let j = 0; j < stocksArray[0].datatable.data.length; j++) {
                let tempObj = {};
                tempObj.symbol = stocksArray[0].datatable.data[j][1];
                stocks.push(tempObj);
            }
            console.log("stocks", stocks);

            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < stocksArray[i].datatable.data.length; j++) {
                    stocks[j][daysInfo[i]] =
                        stocksArray[i].datatable.data[j][2];
                }
            }
            console.log("after stocks", stocks);
            return res.json(stocksArray);
        })
        .catch(next);
});

app.get("/", (req, res, next) => {
    res.end("Server is up!");
});

// Defines next action for errors
function errorHandler(err, req, res, next) {
    console.error(`Error: ${err.stack}`);
    res.status(err.response ? err.response.status : 500);
    res.json({
        error: err.message
    });
}

// Tell the app to use the errorHandler middleware
app.use(errorHandler);

app.listen(app.get("port"), () => {
    console.log(`Find the server at http://localhost:${app.get("port")}/`);
});
