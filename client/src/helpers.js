import moment from 'moment';

// Get array of dates for slider to determine what date the current value is
export function getDates(startDate, stopDate) {
  const dateArray = [];
  let currentDate = moment(startDate);
  stopDate = moment(stopDate);
  while (currentDate <= stopDate) {
    dateArray.push( moment(currentDate).format('L') );
    currentDate = moment(currentDate).add(1, 'days');
  }

  return dateArray;
}

// For select navigation in the main section
export function redirectFromSelect(history, e) {
  history.push(`/${ e.target.value }`);
}

// Fetch helper method
export function checkStatus(response) {
  if (!response.ok) {
    const error = new Error(response.message);
    error.response = response;
    return response.json(error);
  }

  return response.json();
}

export function formatMoney(number) {
  if (!number) return 0;
  return number.toLocaleString(undefined, {minimumFractionDigits: 2});
}

export function formatValueChange(number) {
  return `${ number < 0 ? '' : '+' }${ number.toFixed(2).slice(0) }`;
}

export function validateFormInfo(state) {
  const {
    transactionType,
    transactionQuantity,
    currentPrice,
    cashAvailable,
    quantityOwned
  } = state;

  if (!transactionQuantity) {
    return {
      isValid: false,
      invalidMessage: 'Quantity Required'
    };
  } else if (transactionType === 'BUY' && currentPrice * transactionQuantity > cashAvailable) {
    return {
      isValid: false,
      invalidMessage: 'Not enough available cash'
    };
  } else if (transactionType === 'SELL' && transactionQuantity > quantityOwned) {
    return {
      isValid: false,
      invalidMessage: 'Not enough shares owned'
    };
  } else {
    return {
      isValid: true,
      invalidMessage: null
    };
  }
}

///////// Sort Helpers ///////////

export function sortStockByColumn(stocks, column, direction) {
  let sorted;
  switch (direction) {
    case 'NONE':
      sorted = stocks.sort((a, b) => a.code.localeCompare(b.code));
      return sorted.map(stock => {
        return { ...stock, key: stock.code };
      });
    case 'ASC':
      if (column !== 'code') {
        sorted = stocks.sort((a, b) => a[column] - b[column]);
      } else {
        sorted = stocks.sort((a, b) => b.code.localeCompare(a.code));
      }

      return sorted.map(stock => {
        return { ...stock, key: stock.code };
      });
    case 'DESC':
      if (column !== 'code') {
        sorted = stocks.sort((a, b) => b[column] - a[column]);
      } else {
        sorted = stocks.sort((a, b) => a.code.localeCompare(b.code));
      }

      return sorted.map(stock => {
        return { ...stock, key: stock.code };
      });
    default:
      return stocks;
  }
}

export function sortTransactionsByColumn(transactions, column, direction) {
  let sorted;
  switch (direction) {
    case 'NONE':
      sorted = transactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return sorted.map(transaction => {
        return { ...transaction, key: transaction.id };
      });
    case 'DESC':
      if (column === 'createdAt') {
        sorted = transactions.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      } else if (column !== 'ticker' && column !== 'type') {
        sorted = transactions.sort((a, b) => b[column] - a[column]);
      } else {
        sorted = transactions.sort((a, b) => a[column].localeCompare(b[column]));
      }
      return sorted.map(transaction => {
        return { ...transaction, key: transaction._id };
      });
    case 'ASC':
      if (column === 'createdAt') {
        sorted = transactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else if (column !== 'ticker' && column !== 'type') {
        sorted = transactions.sort((a, b) => a[column] - b[column]);
      } else {
        sorted = transactions.sort((a, b) => b[column].localeCompare(a[column]));
      }
      return sorted.map(transaction => {
        return { ...transaction, key: transaction._id };
      });
    default:
      return transactions;
  }
}

