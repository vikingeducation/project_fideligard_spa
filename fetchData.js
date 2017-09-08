const fs = require("fs");
require("dotenv").config();
const QUANDL_API_KEY = process.env.QUANDL_API_KEY;
const BASE_URL = "https://www.quandl.com/api/v3/datasets/EOD/";
require("isomorphic-fetch");

const ensureFetch = async url => {
  const response = await fetch(url);
  if (!response.ok) {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
  return await response.json();
};

const fetchData = async () => {
  try {
    const stocks = [
      "AAPL",
      "MSFT",
      "IBM",
      "VZ",
      "KO",
      "BA",
      "MMM",
      "CAT",
      "V",
      "UNH",
      "PG",
      "GS",
      "MRK",
      "UTX",
      "TRV"
    ];

    const data = [];
    for (let stock of stocks) {
      console.log("Fetching Stock: ", stock);
      const params =
        "&column_index=4&start_date=2016-01-01&end_date=2016-12-31";
      const url = `${BASE_URL}${stock}.json?${params}&api_key=${QUANDL_API_KEY}`;
      data.push(await ensureFetch(url));
      console.log("Finished with: ", stock);
    }

    fs.writeFileSync("./stockData.json", JSON.stringify(data));
    console.log(`Fetched ${data.length} stocks successfully!`);
  } catch (error) {
    console.error(error);
  }
};

fetchData().then(() => console.log("Finished"));
