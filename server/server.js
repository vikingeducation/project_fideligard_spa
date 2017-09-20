require("isomorphic-fetch");
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const express = require("express");
const app = express();
const moment = require("moment");
const cors = require("cors");

const QUANDL_API_KEY = process.env.QUANDL_API_KEY;

app.set("port", process.env.PORT || 8081);

//---------------------------------------
//Set response headers for CORS
//---------------------------------------
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
app.use(cors());

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
    let day_0 = date;
    let day_1 = date.clone().subtract(1, "day");
    let day_7 = date.clone().subtract(7, "day");
    let day_30 = date.clone().subtract(30, "day");

    let correctedDates = [day_0, day_1, day_7, day_30].map(date => {
        if (date.day() === 0) {
            return date.subtract(2, "day").format("YYYYMMDD");
        } else if (date.day() === 6) {
            return date.subtract(1, "day").format("YYYYMMDD");
        } else {
            return date.format("YYYYMMDD");
        }
    });

    let promiseArray = correctedDates.map(date => {
        return fetch(
            `https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?date=${date}&api_key=${QUANDL_API_KEY}&qopts.columns=date,ticker,close&qopts.per_page=20`
        ).then(checkStatus);
    });

    Promise.all(promiseArray)
        .then(responses => {
            return Promise.all(responses.map(response => response.json()));
        })
        .then(stocksArray => {
            if (!stocksArray[0].datatable.data.length) {
                throw new Error(
                    "Quandl does not have info available on this day. Recommend trying a weekday"
                );
            }
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
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < stocksArray[i].datatable.data.length; j++) {
                    stocks[j][daysInfo[i]] =
                        stocksArray[i].datatable.data[j][2];
                }
            }
            let frontEndStocks = {
                date: day_0,
                stocks
            };
            return res.json(frontEndStocks);
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
