//QUNDL API DATA LIMIT STUFF
//Anonymous Users	20 calls / 10 minutes	50 calls / day	1 call

//NOTE: SAVING A RESULTS FILE WHICH IS JSON VERSION OF THE API CALL THE SERVER MAKES
//apiData.json
//NOTE: SAVING A DATA FILE WHICH IS THE SCRUBBED VERSION OF RESULTS
//data.json
//NOTE: try refactoring the single ticker route code and the allStocks route to reuse a single function

const express = require("express");
const server = express();
require("dotenv").config();
const API_KEY = process.env.API_KEY;
require("isomorphic-fetch");
const fs = require("fs");
const baseUrl = "https://www.quandl.com/api/v3/datasets/EOD";
const randomAPIrequestLimit = 24;

const usableStocks = [
  "V",
  "UNH",
  "PG",
  "KO",
  "GS",
  "WMT",
  "MRK",
  "VZ",
  "UTX",
  "TRV",
  "DIS",
  "BA",
  "HD",
  "MMM",
  "PFE",
  "NKE",
  "MCD",
  "JPM",
  "INTC",
  "GE",
  "CSCO",
  "CVX",
  "CAT",
  "AXP",
  "JNJ",
  "XOM",
  "MSFT",
  "IBM",
  "AAPL"
].slice(0, 2); //length = 29

//api endpoints
server.set("port", 3001);

//start_date=2016-01-01
//end_date=2017-01-01

//server endpoint for getting all stock data
server.get("/api/stocks", async (req, res) => {
  //get the api data as a json obj
  const apiData = await getAllStocks();

  //scrub some data
  let result;
  let scrubbedData;
  try {
    // getCompanyName(description)
    console.log("apiData = ", apiData);
    scrubbedData = apiData.map(jsonCompany =>
      parseJSON(jsonCompany, "2016-01-01", "2017-01-01")
    );
    let result = {};
    scrubbedData.forEach(company => (result[company.info.ticker] = company));
    console.log("scrubbedData = ", scrubbedData);
    console.log("result = ", result);
    scrubbedData = result;
  } catch (e) {
    console.error(new Error(e));
    return res.redirect("https://http.cat/500");
    // return res.setHeader(500);
    throw new Error(e);
  }
  return res.json(scrubbedData);
  // return res.send(JSON.stringify(scrubbedData));
  // return res.sendStatus(500);
});

//individual stock endpoint :: gives you the api response as pure JSON
server.get("/api/stocks/:ticker", (req, res) => {
  const startDate = req.query.startDate || "2016-01-01";
  const endDate = req.query.endDate || "2017-01-01";
  const ticker = req.params.ticker;
  const url = makeUrls({ startDate, endDate }, ticker);
  fetch(url)
    .then(buffer => {
      return buffer.json();
    })
    .catch(error => {
      console.error(error);
      throw error;
    })
    .then(json => {
      //testing
      let newJson = parseJSON(json);
      console.log("new json = ", newJson);
      // return res.send(json);
      return newJson;
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
});

const port = server.listen(server.get("port"), () => {
  console.log(`listening on ${server.get("port")}`);
});

//testing our tickers
const getAllStocks = async (
  startDate = "2016-01-01",
  endDate = "2017-01-01"
) => {
  //don't make an api request if we already have data
  //check for results, in apiData.json

  //check for file existence,
  let exists = await fileExists("apiData.json");
  let apiData;
  let json;
  if (exists) {
    console.log("found the API_DATA ALREADY");
    json = require("./apiData");
  } else {
    console.log("apiData not found, making API CALL");
    //GET DAT DATA
    const tickerArray = usableStocks.slice(0, randomAPIrequestLimit - 2);
    //set defaults
    const options = { startDate, endDate };
    const urlArray = tickerArray.map(ticker => makeUrls(options, ticker));
    console.log(`urlArray = `, urlArray);
    let data;
    // let promises;
    //grab dat data
    try {
      data = urlArray.map(url => {
        return fetch(url);
      });
      apiData = await Promise.all(data);
      console.log("apiData = ", apiData);
      let jsonPromises = apiData.map(buffer => {
        return buffer.json();
      });
      json = await Promise.all(jsonPromises);
      //write API
      //NOTE: this may be a little weird because it's all buffers and stuff
      fs.writeFileSync("apiData.json", JSON.stringify(json, null, 2));
    } catch (e) {
      console.error(new Error(e));
      throw new Error(e);
    }
  }

  console.log("json = ", json);
  return json;
};
// getAllStocks();

//HELPER FUNCTIONS
const util = require("util");
//file => Bool
const fileExists = async file => {
  let filePointer;
  const open = util.promisify(fs.open);
  try {
    filePointer = await open(file, "r");
  } catch (err) {
    console.log("catching error");
    if (err.code === "ENOENT") {
      //create a file
      console.log("file does not exist");
      return false;
    } else {
      console.log("other error");
      console.error(err);
    }
  }
  //close file if you found one
  const close = util.promisify(fs.close);
  await close(filePointer);
  return true;
};

//helper to grab Company name from the API results description
const getCompanyName = description => {
  const line = description
    .split("\n")
    .find(el => el.includes("Prices, dividends"));
  const i = line.indexOf("for");
  const end = line.slice(i + 3);
  const t = end.split(" ");
  const name = t.slice(0, -1).join(" ") || "Dank errors ahoy!";
  return name;
};

//helper function
function makeUrls({ startDate, endDate }, ticker) {
  return `${baseUrl}/${ticker}.json?api_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}`;
}
//stocks should look like this
/*
stocks = {
  tickerName: {
    'info':{
      'name': String,       //Visa
      'id': Number,         //14032352
      'ticker': String      //V
      'startDate': String,  //'2016-01-01'
      'endDate': String     //'2017-01-01'
    },
    prices: {
      'date': {
        price: Number,
        '1d': Number,
        '7d': Number,
        '30d': Number
      },
      'date': {
        price: Number,
        '1d': Number,
        '7d': Number,
        '30d': Number
      }
    }
  }
};
*/
//TESTING
function parseJSON(jsonCompany, startDate, endDate) {
  endDate = new Date(endDate);
  startDate = new Date(startDate);
  let stockData = jsonCompany["dataset"]["data"].reverse();
  let currDate = startDate;
  let columnNameCloseIndex = jsonCompany["dataset"]["column_names"].indexOf(
    "Close"
  );
  // let stockDataParsed = [];
  let prices = {};
  let stockDataParsed = {
    info: {
      name: getCompanyName(jsonCompany.dataset.description),
      id: jsonCompany.dataset.id,
      ticker: jsonCompany.dataset.dataset_code,
      startDate: startDate,
      endDate: endDate
    },
    prices
  };
  let count = 0;
  while (endDate > currDate) {
    if (currDate < new Date(stockData[count][0])) {
      //condition 1
      if (count < 1) {
        // stockDataParsed.push({
        //   date: new Date(currDate),
        //   close: stockData[0][columnNameCloseIndex]
        // });
        prices[new Date(currDate)] = {
          price: stockData[0][columnNameCloseIndex],
          "1d": undefined,
          "7d": undefined,
          "30d": undefined
        };
      } else {
        //condition 2
        // stockDataParsed.push({
        //   date: new Date(currDate),
        //   close: stockData[count - 1][columnNameCloseIndex]
        // });
        prices[new Date(currDate)] = {
          price: stockData[count - 1][columnNameCloseIndex],
          "1d": undefined,
          "7d": undefined,
          "30d": undefined
        };
      }

      currDate.setDate(currDate.getDate() + 1);
      continue;
    }
    //condition 3
    // stockDataParsed.push({
    //   date: new Date(currDate),
    //   close: stockData[count][columnNameCloseIndex]
    // });
    prices[new Date(currDate)] = {
      price: stockData[count][columnNameCloseIndex],
      "1d": undefined,
      "7d": undefined,
      "30d": undefined
    };
    count = stockData.length - 1 > count ? ++count : count;
    //count++
    currDate.setDate(currDate.getDate() + 1);
  }
  return stockDataParsed;
}
