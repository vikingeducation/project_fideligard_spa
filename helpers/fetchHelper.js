const checkStatus = (response) => {
  if (!response.ok) {
    const error = new Error(response.message);
    error.response = response;
    throw error;
  }

  return response.json();
};

const extractStockData = (stockInfo, numOfCodes) => {
  // Get unique stock codes based on numOfCodes
  const stockCodes = stockInfo.map(stock => stock[0]);
  let codes = [...new Set(stockCodes)];
  let uniqueCodes;

  if (numOfCodes) {
    uniqueCodes = codes.slice(codes.length - (numOfCodes + 1), codes.length - 1);
  } else {
    uniqueCodes = codes;
  }

  // create an object of objects with the code as the key and the value an array of dates and price
  const parsedStocks = {};
  for (let code of uniqueCodes) {
    for (let [stockCode, date, price] of stockInfo) {
      if (!(code in parsedStocks)) parsedStocks[code] = [];

      if (code === stockCode) {
        parsedStocks[code].push([date, price]);
      }
    }
  }

  // create an array of objects with code, current price, 1 day, 7 day, and 30 day changes to send to client
  const stockData = [];
  for (let code of Object.keys(parsedStocks)) {

    const currentIndex = parsedStocks[code].length - 1;
    const oneDayIndex = parsedStocks[code].length - 2;
    const sevenDayIndex = parsedStocks[code].length - 8;
    const currentPrice = parsedStocks[code][currentIndex][1];

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
