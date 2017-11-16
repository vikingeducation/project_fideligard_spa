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

export function sanitizeStocks(stock1, stock2, stock3, stock4) {
  if (!stock1 || !stock2 || !stock3 || !stock4) {
    return false;
  }
  let arrayStock = [stock1, stock2, stock3, stock4];
  //Sort shortest to longest
  arrayStock.sort(function(a, b) {
    return a.length - b.length;
  });
  let answer = [];
  for (var i = 0; i < arrayStock[0].length; i++) {
    //If all symbols are equal, push
    if (
      arrayStock[0][i][0] === arrayStock[1][i][0] &&
      arrayStock[2][i][0] === arrayStock[3][i][0] &&
      arrayStock[0][i][0] === arrayStock[3][i][0]
    ) {
      answer.push([
        arrayStock[0][i],
        arrayStock[1][i],
        arrayStock[2][i],
        arrayStock[3][i]
      ]);
    } else {
      let trimAndRepeat = false;
      //if Banana > Apple, remove Apple
      if (arrayStock[0][i][0] > arrayStock[1][i][0]) {
        arrayStock[1].splice(i, 1);
        trimAndRepeat = true;
      }
      if (arrayStock[0][i][0] > arrayStock[2][i][0]) {
        arrayStock[2].splice(i, 1);
        trimAndRepeat = true;
      }
      if (arrayStock[0][i][0] > arrayStock[3][i][0]) {
        arrayStock[3].splice(i, 1);
        trimAndRepeat = true;
      }
      //if Apple < Banana, add Empty Apple
      if (arrayStock[0][i][0] < arrayStock[1][i][0]) {
        arrayStock[1].splice(i, 0, [
          arrayStock[0][i][0],
          arrayStock[1][i][1],
          "N/A"
        ]);
      }
      if (arrayStock[0][i][0] < arrayStock[2][i][0]) {
        arrayStock[2].splice(i, 0, [
          arrayStock[0][i][0],
          arrayStock[2][i][1],
          "N/A"
        ]);
      }
      if (arrayStock[0][i][0] < arrayStock[3][i][0]) {
        arrayStock[3].splice(i, 0, [
          arrayStock[0][i][0],
          arrayStock[3][i][1],
          "N/A"
        ]);
      }
      //If removed from other arrays, repeat
      if (trimAndRepeat && i !== arrayStock[0].length) {
        i--;
      }
      //If trimmed too much, exit
      if (
        arrayStock[1].length < arrayStock[0].length ||
        arrayStock[2] < arrayStock[0].length ||
        arrayStock[3] < arrayStock[0].length
      ) {
        i = arrayStock[0].length + 1;
      }
    }
  }
  //Sort by date, current, yesterday, past...
  for (var j = 0; j < answer.length; j++) {
    answer[j].sort((a, b) => {
      return new Date(a[1]) < new Date(b[1]);
    });
  }

  return answer;
}
//
// export function hashStocks(stocks) {
//   let hashedStocks = {};
//   console.log(stocks);
//   for (var i = 0; i < stocks.length; i++) {
//     hashedStocks[stocks[i][0][0]] = {
//       price: [
//         stocks[i][0][2],
//         stocks[i][1][2],
//         stocks[i][2][2],
//         stocks[i][3][2]
//       ],
//       date: [stocks[i][0][1], stocks[i][1][1], stocks[i][2][1], stocks[i][3][1]]
//     };
//   }
//   return hashedStocks;
// }
