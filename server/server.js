require("isomorphic-fetch");
require("dotenv").config();
const express = require("express");
const app = express();

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
    console.log("Getting stocks...")
    let date = req.params.date || "2017-05-17";
    fetch(`https://www.quandl.com/api/v3/datasets/EOD/AAPL.json?api_key=${QUANDL_API_KEY}&start_date=${date}&end_date=${date}&column_index=4`)
        .then(checkStatus)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            console.log(JSON.stringify(json, null, 2));
            return res.json(json);
        })
        .catch(next);
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
