export function apiDate(date) {
  if (!date) {
    date = new Date();
  } else {
    date = new Date(date);
  }
  return (
    date.getFullYear() +
    "-" +
    (Number(date.getMonth()) + 1) +
    "-" +
    date.getDate()
  );
}

export function displayDate(currentDate) {
  if (!currentDate) {
    currentDate = new Date();
  }
  let formattedDate = new Date(currentDate);
  return (
    Number(formattedDate.getMonth()) +
    1 +
    "-" +
    formattedDate.getDate() +
    "-" +
    formattedDate.getFullYear()
  );
}

export function previousDate(currentDate, daysBack) {
  let formattedDate;
  if (!currentDate) {
    formattedDate = new Date();
  } else {
    formattedDate = new Date(currentDate);
  }

  if (!daysBack) {
    return apiDate(formattedDate);
  } else if (daysBack) {
    formattedDate.setDate(formattedDate.getDate() - daysBack);
    return apiDate(formattedDate);
  } else {
    return "";
  }
}

export function inputDate(date) {
  date = new Date(date);

  let inputValue = "";
  let inputYear = date.getFullYear();
  let inputDay = Number(date.getDate());
  let inputMonth = Number(date.getMonth()) + 1;
  if (inputMonth < 10) {
    inputMonth = "0" + inputMonth;
  }
  if (inputDay < 10) {
    inputDay = "0" + inputDay;
  }
  inputValue = inputYear + "-" + inputMonth + "-" + inputDay;
  return inputValue;
}

export function dateDifference(firstDate, secondDate) {
  if (!firstDate) {
    return false;
  }
  if (!secondDate) {
    secondDate = new Date();
  }
  let dateOne = new Date(firstDate);
  let dateTwo = new Date(secondDate);
  var _MS_PER_DAY = 1000 * 60 * 60 * 24;

  // Discard the time and time-zone information.
  let utc1 = Date.UTC(
    dateOne.getFullYear(),
    dateOne.getMonth(),
    dateOne.getDate()
  );
  let utc2 = Date.UTC(
    dateTwo.getFullYear(),
    dateTwo.getMonth(),
    dateTwo.getDate()
  );

  return Math.floor((utc2 - utc1) / _MS_PER_DAY) - 1;
}

export function hashStocks(stocks) {
  let hashedStocks = {};
  stocks.forEach(stock => {
    hashedStocks[stock[0]] = stock[2];
  });
  return hashedStocks;
}
