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
