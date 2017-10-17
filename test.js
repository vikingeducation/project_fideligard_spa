//a date generator that moves forward by one day by default

////let date = genDate();
////date.next(-1)   //moves it back a day
const genDate = function*(startDate = "2016-01-01", endDate = "2017-01-01") {
  startDate = new Date(startDate);
  endDate = new Date(endDate);
  let currentDate = startDate;
  while (currentDate <= endDate) {
    let injected = yield currentDate;
    injected = injected || 1;
    currentDate = new Date(
      currentDate.setDate(currentDate.getDate() + injected)
    );
  }
  return null;
};
//TODO:
//make a day of the year function
/*
"data": [
  [
    "2016-12-30",
    78.43,
    78.54,
    77.935,
    78.02,
    7127255,
    0,
    1,
    78.01734454151529,
    78.12676578210647,
    77.52494895885495,
    77.60950173567541,
    7127255
  ],
  [
    "2016-12-29",
    78.49,
    78.84,
    78.3,
    78.33,
    6241083,
    0,
    1,
    78.07702885456501,
    78.42518734735516,
    77.88802852990752,
    77.91787068643238,
    6241083
  ],
  */

const dateTypeToDateString = date => {
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}}`;
};

//functional
const getDatesArr = (startDate, endDate) => {
  const begin = new Date(startDate);
  const finish = new Date(endDate);
  const dateIter = genDate(begin, finish);
  return [...dateIter];
};
const parse = (
  jsonCompany,
  startDate = "2016-01-01",
  endDate = "2017-01-01"
) => {
  const columnNameCloseIndex = 4;
  //extract data you want
  //TODO: get rid of the reverse()
  const data = jsonCompany["dataset"]["data"].reverse();

  //make an array of all the dates
  const dates = getDatesArr(startDate, endDate);
  //for each date of the year grab the data you need
  //filling in any gaps due to holidays

  //set a previous value;
  let counter = 0;
  const json = dates.map((date, index, arr) => {
    //if the date is in there then use it
    if (dateTypeToDateString(date) === data[counter]) {
      let newDay = {
        price: stockData[counter][columnNameCloseIndex],
        "1d": undefined,
        "7d": undefined,
        "30d": undefined
      };
      counter++;
      return newDay;
    } else if (counter === 0) {
      //check to see if we started our dates before we have data
      let newDay = {
        price: stockData[counter][columnNameCloseIndex],
        "1d": undefined,
        "7d": undefined,
        "30d": undefined
      };
      return newDay;
    } else {
      //if not use a previous day
      let dateIter = genDate(date, endDate);
      let yesterday;
      let tmpCounter = counter;
      while (
        (yesterday =
          dateTypeToDateString(dateIter.next(-1)) !== data[tmpCounter])
      ) {
        //keep looking for a day we have data for
        tmpCounter--;
      }
      let newDay = {
        price: stockData[counter][columnNameCloseIndex],
        "1d": undefined,
        "7d": undefined,
        "30d": undefined
      };
      return newDay;
    }
    return json;
  });

  //dateTypeToDateString

  //for each date fill in your data
  //setup your finsihed data structure
  // const arrayOfDates = new Array()
  //   new Date(currDate) = {
  //   price: stockData[0][columnNameCloseIndex],
  //   "1d": undefined,
  //   "7d": undefined,
  //   "30d": undefined
  // };
  // let prices = {
  //
  // };
  let stockDataParsed = {
    info: {
      name: getCompanyName(jsonCompany.dataset.description),
      id: jsonCompany.dataset.id,
      ticker: jsonCompany.dataset.dataset_code,
      startDate: startDate,
      endDate: endDate
    },
    prices
  };
};

//imperative
function parseJSON(jsonCompany, startDate, endDate) {
  endDate = new Date(endDate);
  startDate = new Date(startDate);
  let stockData = jsonCompany["dataset"]["data"].reverse();
  let currDate = startDate;
  let columnNameCloseIndex = jsonCompany["dataset"]["column_names"].indexOf(
    "Close"
  );
  // let stockDataParsed = [];
  let prices = {};
  let stockDataParsed = {
    info: {
      name: getCompanyName(jsonCompany.dataset.description),
      id: jsonCompany.dataset.id,
      ticker: jsonCompany.dataset.dataset_code,
      startDate: startDate,
      endDate: endDate
    },
    prices
  };
  let count = 0;
  while (endDate > currDate) {
    if (currDate < new Date(stockData[count][0])) {
      //condition 1
      if (count < 1) {
        // stockDataParsed.push({
        //   date: new Date(currDate),
        //   close: stockData[0][columnNameCloseIndex]
        // });
        prices[new Date(currDate)] = {
          price: stockData[0][columnNameCloseIndex],
          "1d": undefined,
          "7d": undefined,
          "30d": undefined
        };
      } else {
        //condition 2
        // stockDataParsed.push({
        //   date: new Date(currDate),
        //   close: stockData[count - 1][columnNameCloseIndex]
        // });
        prices[new Date(currDate)] = {
          price: stockData[count - 1][columnNameCloseIndex],
          "1d": undefined,
          "7d": undefined,
          "30d": undefined
        };
      }

      currDate.setDate(currDate.getDate() + 1);
      continue;
    }
    //condition 3
    // stockDataParsed.push({
    //   date: new Date(currDate),
    //   close: stockData[count][columnNameCloseIndex]
    // });
    prices[new Date(currDate)] = {
      price: stockData[count][columnNameCloseIndex],
      "1d": undefined,
      "7d": undefined,
      "30d": undefined
    };
    count = stockData.length - 1 > count ? ++count : count;
    //count++
    currDate.setDate(currDate.getDate() + 1);
  }
  return stockDataParsed;
}
const jsonCompany = {};
parseJSON(jsonCompany, "2016-01-01", "2017-01-01");

const friday13 = function*(startDate, endDate){
  let dateIter = genDate(startDate, endDate);
  // let tmpCounter = counter;
  //we need .getDate() === 13 (13th)
    //and .getDay() === 5 (A friday)
  let friday13;
  while(){
    friday13 = dateIter.next()
    while ((friday13 = dateIter.next()).getDay() !== 5 || friday13.getDate() !== 13) {
      friday13 = dateIter.next()
    }
  }

}
