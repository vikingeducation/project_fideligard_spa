import api_key from "./private.js";

export const GET_REQUEST = "GET_REQUEST";
export const GET_SUCCESS = "GET_SUCCESS";
export const GET_FAILURE = "GET_FAILURE";

export function getRequest() {
  return {
    type: GET_REQUEST
  };
}

export function getSuccess(data) {
  return {
    type: GET_SUCCESS,
    data
  };
}

export function getFailure(error) {
  return {
    type: GET_FAILURE,
    error
  };
}

export function getStockData(query) {
  return dispatch => {
    dispatch(getRequest());
    fetch(
      `https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?ticker=${query}&qopts.columns=date,close&api_key=${api_key}`
    )
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response}`);
        }
        return response.json();
      })
      .then(response => {
        console.log(response);
        dispatch(getSuccess(response));
      })
      .catch(e => {
        dispatch(getFailure(e));
      });
  };
}
