const LocalDate = require('js-joda').LocalDate;
const MAX_DAYS_AGO = 35;

const isDateCorrect = date => {
  let dateFormatRegex = /^[\d]{4}-(\d){2}-(\d){2}$/;
  return dateFormatRegex.test(date);
};
const parseSymbols = symbols => {
  let results = symbols.split(',');
  return results.filter(symbol => symbol.length > 0);
};

const parseStartDate = endDate => {
  let end = LocalDate.parse(endDate);
  let start = end.minusDays(MAX_DAYS_AGO);
  return start.toString();
};

module.exports = {
  parseSymbols,
  parseStartDate,
  isDateCorrect
}