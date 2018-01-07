const checkStatus = (response) => {
  if (!response.ok) {
    const error = new Error(response.message);
    error.response = response;
    throw error;
  }

  return response.json();
};

const extractStockData = (stocks, amount) => {
  const stockInfo = stocks.datatable ? stocks.datatable.data : stocks;
  const stockCodes = [];

  // Get unique stock codes based on amount
  for (let stock of stockInfo) stockCodes.push(stock[0]);
  let codes = [...new Set(stockCodes)];
  let uniqueCodes;

  if (amount) {
    uniqueCodes = codes.slice(codes.length - (amount + 1), codes.length - 1);
  } else {
    uniqueCodes = codes;
  }

  // create an object of objects with the code as the key and the value an array of dates and price
  const parsedStocks = {};
  for (let code of uniqueCodes) {
    for (let [stockCode, date, price] of stockInfo) {
      if (!parsedStocks[code]) parsedStocks[code] = [];

      if (code === stockCode) {
        parsedStocks[code].push([date, price]);
      }
    }
  }

  // create an array of objects with code, current price, 1 day, 7 day, and 30 day changes to send to client
  const stockData = [];
  for (let code of Object.keys(parsedStocks)) {

    let currentIndex = parsedStocks[code].length - 1;
    let oneDayIndex = parsedStocks[code].length - 2;
    let sevenDayIndex = parsedStocks[code].length - 8;
    let currentPrice = parsedStocks[code][currentIndex][1];

    stockData.push({
      code,
      currentPrice,
      oneDayDiff: currentPrice - parsedStocks[code][oneDayIndex][1],
      sevenDayDiff: currentPrice - parsedStocks[code][sevenDayIndex][1],
      thirtyDayDiff: currentPrice - parsedStocks[code][0][1]
    });
  }

  return { status: 200, stockData };
};

const extractLastClosingPrice = (apiResponse) => {
  const stockInfo = apiResponse.datatable.data;
  if (!stockInfo.length) return;

  // Send the latest price
  return stockInfo[stockInfo.length - 1][1];
};

module.exports = { checkStatus, extractStockData, extractLastClosingPrice };
