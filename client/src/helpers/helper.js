export function previousDate(currentDate, daysBack) {
  let formattedDate = new Date(currentDate);

  if (!daysBack) {
    return (
      formattedDate.getFullYear() +
      "-" +
      (Number(formattedDate.getMonth()) + 1) +
      "-" +
      formattedDate.getDate()
    );
  } else if (daysBack) {
    formattedDate.setDate(formattedDate.getDate() - daysBack);
    return (
      formattedDate.getFullYear() +
      "-" +
      (Number(formattedDate.getMonth()) + 1) +
      "-" +
      formattedDate.getDate()
    );
  } else {
    return "";
  }
}

export function sanitizeStocks(stock1, stock2, stock3, stock4) {
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
  answer.sort(function(a, b) {
    return a[1] > b[1];
  });
  return answer;
}
