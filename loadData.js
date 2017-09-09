const fs = require("fs");
const moment = require("moment");

const day = i => {
  return moment()
    .year(2016)
    .dayOfYear(i)
    .startOf("day")
    .unix();
};

const getFirstPrice = prices => {
  let i = 1;
  while (!prices[day(i)]) i++;
  return prices[day(i)];
};

const buildPriceHash = company => {
  return company.dataset.data.reduce((acc, [date, price]) => {
    acc[moment(date).unix()] = price;
    return acc;
  }, {});
};

const buildPricesData = company => {
  const prices = buildPriceHash(company);
  let mostRecentPrice = getFirstPrice(prices);
  for (let i = 1; i < 367; i++) {
    const price = prices[day(i)];
    mostRecentPrice = price ? price : mostRecentPrice;
    prices[day(i)] = mostRecentPrice;
  }
  return prices;
};

const gatherData = async () => {
  const data = JSON.parse(fs.readFileSync("./stockData.json", "utf8"));
  return data.map(company => {
    return {
      code: company.dataset.dataset_code,
      prices: buildPricesData(company)
    };
  });
};

module.exports = gatherData();
