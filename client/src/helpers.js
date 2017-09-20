const filterTransactions = (date, transactions) => {
  return transactions.filter(transaction => transaction.date <= date);
};

let portfId = 1;
export const getPortfolio = (transactions, date, stocks) => {
  let portfolioStocks = [];
  let uniqueStocks = [];
  transactions = filterTransactions(date, transactions);
  transactions.forEach(transaction => {
    if (!uniqueStocks.includes(transaction.symbol)) {
      uniqueStocks.push(transaction.symbol);
      portfolioStocks.push({
        symbol: transaction.symbol,
        quantity: 0,
        moneySpent: 0,
        moneyEarned: 0,
        id: portfId++
      });
    }
  });
  for (let i = 0; i < transactions.length; i++) {
    for (let j = 0; j < portfolioStocks.length; j++) {
      if (portfolioStocks[j].symbol === transactions[i].symbol) {
        if (transactions[i].type === "buy") {
          portfolioStocks[j].quantity += transactions[i].quantity;
          portfolioStocks[j].moneySpent +=
            transactions[i].quantity * transactions[i].price;
        } else {
          portfolioStocks[j].quantity -= transactions[i].quantity;
          portfolioStocks[j].moneyEarned +=
            transactions[i].quantity * transactions[i].price;
        }
      }
    }
  }
  for (let i = 0; i < portfolioStocks.length; i++) {
    for (let j = 0; j < stocks.length; j++) {
      if (portfolioStocks[i].symbol === stocks[j].symbol) {
        portfolioStocks[i].day_0 = stocks[j].day_0;
        portfolioStocks[i].day_1 = stocks[j].day_1;
        portfolioStocks[i].day_7 = stocks[j].day_7;
        portfolioStocks[i].day_30 = stocks[j].day_30;
        break;
      }
    }
  }
  return portfolioStocks;
};

export const getTotals = portfolio => {
  let total = {
    costBasis: 0,
    day_0: 0,
    profitLoss: 0,
    day_1: 0,
    day_7: 0,
    day_30: 0
  };
  portfolio.forEach(item => {
    total.costBasis += item.moneySpent - item.moneyEarned;
    total.day_0 += item.day_0;
    total.profitLoss +=
      item.quantity * (item.day_0 - (item.moneySpent - item.moneyEarned));
    total.day_1 += item.day_1;
    total.day_7 += item.day_7;
    total.day_30 += item.day_30;
  });
  return total;
};
