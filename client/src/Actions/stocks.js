export const REQUEST_GET_STOCK = "REQUEST_GET_STOCK";
export const SUCCESS_GET_STOCK = "SUCCESS_GET_STOCK";
export const FAILURE_GET_STOCK = "SUCCESS_GET_STOCK";

const requestGetStock = () => ({
  type: REQUEST_GET_STOCK,
  data: null
});

const successGetStock = data => ({
  type: SUCCESS_GET_STOCK,
  data
});

const failureGetStock = error => ({
  type: FAILURE_GET_STOCK,
  data: error
});

//stock data structure
// stocks = {
//   tickerName: {
//     'date': {
//       price: Number,
//       '1d': Number,
//       '7d': Number,
//       '30d': Number
//     }
//   }
// };
export const getStocks = () => async dispatch => {
  dispatch(requestGetStock());
  let url = "api/stocks/";
  let result;

  try {
    result = await fetch(url);
    result = await result.json();
    console.log(`result = `, result);

    //for the moment do some hacky fixes for the server-side shit fest I have going on right now
    // const tickerArray = ["AAPL", "MMM", "BA"];
    // const dataForDay = {
    //   price: undefined,
    //   "1d": undefined,
    //   "7d": undefined,
    //   "30d": undefined
    // };
    // //make our data structure
    // const stocks = result.reduce((hash, stock, idx) => {
    //   const stuff = stock.map(day => {
    //     return {
    //       price: day.close,
    //       "1d": undefined,
    //       "7d": undefined,
    //       "30d": undefined
    //     };
    //   });
    //   let companyData = {};
    //   // const newHash = (hash[tickerArray[idx]] = companyData);
    //   return (hash[tickerArray[idx]] = companyData);
    // return newHash;
    // }, {});
    // console.log("stock structure = ", stocks);
    dispatch(successGetStock(result));
  } catch (err) {
    dispatch(failureGetStock(err));
  }
};
