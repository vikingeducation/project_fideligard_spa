const LocalDate = require('js-joda').LocalDate;
const MAX_DAYS_AGO = 35;

const isDateCorrect = date => {
  let dateFormatRegex = /^[\d]{4}-(\d){2}-(\d){2}$/;
  return dateFormatRegex.test(date);
};
const parseSymbols = symbols => {
  let results = symbols.toUpperCase().split(',');
  return results.filter(symbol => symbol.length > 0);
};

const determineStartDate = endDate => {
  let end = LocalDate.parse(endDate);
  let start = end.minusDays(MAX_DAYS_AGO);
  return start.toString();
};

const removeWeekendDates = date => {
  let results = LocalDate.parse(date);
  while (results.dayOfWeek().toString() === "SATURDAY" ||
         results.dayOfWeek().toString() === "SUNDAY") {
    results = results.minusDays(1);
  }
  return results;
};

const determineWeekdayDate = (date, distance) => {
  let parsedDate = LocalDate.parse(date);
  let results = parsedDate.minusDays(distance);
  return removeWeekendDates(results.toString());
};

const parseAPIResults = (data, symbols, endDate) => {
  let results = {
    data: {}
  }
  
  // Stock data is not updated on weekends, so we go back in time as far
  // as far as necessary if user provided a weekend
  let parsedEndDate = removeWeekendDates(endDate);
  let oneDayAgo = determineWeekdayDate(endDate, 1);
  let sevenDaysAgo = determineWeekdayDate(endDate, 7);
  let thirtyDaysAgo = determineWeekdayDate(endDate, 30);

  symbols.forEach(symbol => {
    results.data[symbol] = {
      today: "",
      oneDay: "",
      sevenDays: "",
      thirtyDays: ""
    }

    data.forEach(price => {
      let isSymbolInData = price[0] === symbol;
      let isDataFromEndDate = price[1] === parsedEndDate.toString();
      let isDataOneDayOld = price[1] === oneDayAgo.toString();
      let isDataSevenDaysOld = price[1] === sevenDaysAgo.toString();
      let isDataThirtyDaysOld = price[1] === thirtyDaysAgo.toString();

      if (isSymbolInData) {
        if (isDataFromEndDate) {
          results.data[symbol].today = price[2] || "";
        }
        if (isDataOneDayOld) {
          results.data[symbol].oneDay = price[2] || "";
        } 
        if (isDataSevenDaysOld) {
          results.data[symbol].sevenDays = price[2] || "";
        }
        if (isDataThirtyDaysOld) {
          results.data[symbol].thirtyDays = price[2] || "";
        }
      }
    });
  });

  return results;
};

module.exports = {
  parseSymbols,
  determineStartDate,
  isDateCorrect,
  parseAPIResults
}