//QUNDL API DATA LIMIT STUFF
//Anonymous Users	20 calls / 10 minutes	50 calls / day	1 call

//NOTE: SAVING A RESULTS FILE WHICH IS JSON VERSION OF THE API CALL THE SERVER MAKES
//apiData.json
//NOTE: SAVING A DATA FILE WHICH IS THE SCRUBBED VERSION OF RESULTS
//data.json

//TODO: make a day of the year function

//TODO: ADD A TICKER ARRAY
//NOTE: try refactoring the single ticker route code and the allStocks route to reuse a single function

const express = require("express");
const server = express();
require("dotenv").config();
const API_KEY = process.env.API_KEY;
require("isomorphic-fetch");
const fs = require("fs");
//holy moly I used the wrong db
//TODO: redo server code to use the WIKI endpoint
const fancyCall = `https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?date.gte=20150101&date.lt=20160101&ticker=V,UNH,PG,KO,GS,WMT,MRK,VZ,UTX,TRV,DIS,BA,HD,MMM,PFE,NKE,MCD,JPM,INTC,GE,CSCO,CVX,CAT,AXP,JNJ,XOM,MSFT,IBM,AAPL,FB&api_key=${API_KEY}`;
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
    scrubbedData = apiData.map(jsonCompany =>
      // parseJSON(jsonCompany, "2016-01-01", "2017-01-01")
      parse(jsonCompany, "2016-01-01", "2017-01-01")
    );
    let result = {};
    scrubbedData.forEach(company => (result[company.info.ticker] = company));
    // console.log("scrubbedData = ", scrubbedData);
    // console.log("result = ", result);
    scrubbedData = result;
  } catch (e) {
    console.error(e);
    return res.redirect("https://http.cat/500");
    // return res.setHeader(500);
    throw e;
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
      // console.log("new json = ", newJson);
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

//check if we need to even make an api call,
//if yes makes it
//if no grabs from apiData.json
//return JSON
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
    // console.log(`urlArray = `, urlArray);
    let data;
    //grab dat data
    try {
      data = urlArray.map(url => {
        return fetch(url);
      });
      apiData = await Promise.all(data);
      // console.log("apiData = ", apiData);
      let jsonPromises = apiData.map(buffer => {
        return buffer.json();
      });
      json = await Promise.all(jsonPromises);
      //write API
      //NOTE: this may be a little weird because it's all buffers and stuff
      fs.writeFileSync("apiData.json", JSON.stringify(json, null, 2));
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
  // console.log("json = ", json);
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

//a date generator that moves forward by one day by default

////let date = genDate();
////date.next(-1)   //moves it back a day
const genDate = function*(startDate = "2016-01-01", endDate = "2017-01-01") {
  startDate = new Date(startDate);
  endDate = new Date(endDate);
  let currentDate = startDate;
  while (currentDate <= endDate) {
    let injected = yield currentDate;
    injected = injected || 1;
    currentDate = new Date(
      currentDate.setDate(currentDate.getDate() + injected)
    );
  }
  return null;
};
//TODO:
//make a day of the year function
//TODO: FIX THIS LATER
/*
dateTypeToDateString(date) =  2016-01-01
case 2
stockData[counter] =  2016-01-04
dateTypeToDateString(date) =  2016-01-2
case 2
stockData[counter] =  2016-01-04
dateTypeToDateString(date) =  2016-01-3
*/
var countDigits = number => {
  let digits = 1;
  let num = number;
  while (num > 1) {
    num = Math.trunc(num / 10);
    digits++;
  }
  return digits;
};
var isOneDigit = string => {
  let number = Number(string);
  if (countDigits(number) === 1) {
    return true;
  }
  return false;
};
//if it's one digit add a 0
var dateTypeToDateString = date => {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const month = isOneDigit(m) ? `0${m}` : `${m}`;
  const day = isOneDigit(d) ? `0${d}` : `${d}`;
  // console.log(
  //   "date = ",
  //   date,
  //   "isOneDigit(date.getDate() + 1) ",
  //   isOneDigit(date.getDate())
  // );
  return `${date.getFullYear()}-${month}-${day}`;
};

const getDatesArr = (startDate, endDate) => {
  const begin = new Date(startDate);
  const finish = new Date(endDate);
  const dateIter = genDate(begin, finish);
  return [...dateIter];
};
//functional approach to parsing
//...well attempted functional approach
const parse = (
  jsonCompany,
  startDate = "2016-01-01",
  endDate = "2017-01-01"
) => {
  console.log("running parse");
  const columnNameCloseIndex = 4;
  //extract data you want
  //TODO: get rid of the reverse()
  const stockData = jsonCompany["dataset"]["data"].reverse();

  //make an array of all the dates
  const dates = getDatesArr(startDate, endDate);
  //for each date of the year grab the data you need
  //filling in any gaps due to holidays

  //set a previous value;
  let counter = 0;

  const json = dates.map((date, index, arr) => {
    //if the date is in there then use it
    console.log("stockData[counter] = ", stockData[counter][0]);
    console.log("dateTypeToDateString(date) = ", dateTypeToDateString(date));
    if (dateTypeToDateString(date) === stockData[counter][0]) {
      console.log("case 1");
      let newDay = {
        date: date,
        price: stockData[counter][columnNameCloseIndex],
        "1d": null,
        "7d": null,
        "30d": null
      };
      // counter++;       //broke the server fix later
      return newDay;
    } else if (counter === 0) {
      //check to see if we started our dates before we have data
      console.log("case 2");
      let newDay = {
        date: date,
        price: stockData[counter][columnNameCloseIndex],
        "1d": null,
        "7d": null,
        "30d": null
      };
      return newDay;
    } else {
      //if not use a previous day
      console.log("case 3");
      let dateIter = genDate(date, endDate);
      let yesterday = dateTypeToDateString(dateIter.next(-1).value);
      let tmpCounter = counter;
      // while (
      //   (yesterday =
      //     dateTypeToDateString(dateIter.next(-1).value) !==
      //     stockData[tmpCounter])
      // ) {
      //   //keep looking for a day we have data for
      //   tmpCounter--;
      // }
      // console.log(`tmpCounter = ${tmpCounter}`);
      // console.log("stockData = ", stockData);
      while (yesterday !== stockData[tmpCounter][0]) {
        // console.log(
        //   "yesterday = ",
        //   yesterday,
        //   "\nstockData[tmpCounter] ==",
        //   stockData[tmpCounter]
        // );
        // console.log(`tmpCounter = ${tmpCounter}`);
        yesterday = dateTypeToDateString(dateIter.next(-1).value);
        tmpCounter--;
      }
      let newDay = {
        date: date,
        price: stockData[counter][columnNameCloseIndex],
        "1d": null,
        "7d": null,
        "30d": null
      };
      return newDay;
    }
  });
  // let prices = json;
  // change json from = [{},{}]
  // to prices = {date: {}, date: {}}
  // console.log("json = ", json);
  let prices = json.reduce((hash, priceObj) => {
    let dateString = `${priceObj.date.getFullYear()}-${priceObj.date.getMonth() +
      1}-${priceObj.date.getDate()}`;
    hash[dateString] = priceObj;
    return hash;
  }, {});
  // console.log(prices, " = prices");
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
  // console.log("stock data from server = ", stockDataParsed);
  return stockDataParsed;
};
