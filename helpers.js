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

const parseStartDate = endDate => {
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

const parseAPIResults = (data, symbols, endDate) => {
  let results = {
    data: {}
  }
  
  let parsedEndDate = removeWeekendDates(endDate);

  symbols.forEach(symbol => {
    results.data[symbol] = {
      today: [],
      oneDay: [],
      sevenDays: [],
      thirtyDays: []
    }


    data.forEach(price => {
      let isSymbolInData = price[0] === symbol;
      let isDataFromEndDate = price[1] === endDate;

      if (isSymbolInData) {
        if (isDataFromEndDate) {
          console.log(price)
          console.log(endDate);
        }
      }
    });
  });
};

module.exports = {
  parseSymbols,
  parseStartDate,
  isDateCorrect,
  parseAPIResults
}