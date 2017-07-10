const parseSymbols = (symbols) => {
  let results = symbols.split(',');
  return results.filter(symbol => symbol.length > 0);
};

module.exports = {
  parseSymbols
}