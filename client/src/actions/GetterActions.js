import { GET_STOCK_SUCCESS, GET_REQUEST, GET_REQUEST_FAILURE } from "./types";
//API CALLS
export function getRequest() {
  return {
    type: GET_REQUEST
  };
}

export function getStockSuccess(date, data) {
  return {
    type: GET_STOCK_SUCCESS,
    data: { date, data }
  };
}

export function getRequestFailure(error) {
  return {
    type: GET_REQUEST_FAILURE,
    error
  };
}

const checkStatus = response => {
  if (!response.ok) {
    throw new Error("Error with api");
  }
  return response.json();
};

export function getApiData(date, stocks) {
  return dispatch => {
    dispatch(getRequest());
    if (!date || !stocks) {
      dispatch(() => {});
    } else if (stocks[date] !== undefined) {
      dispatch(() => {});
    } else {
      fetch(`http://10.0.0.10:3001/WIKI/PRICES/${date}/`)
        .then(checkStatus)
        .then(json => {
          if (json.datatable.data.length < 1) {
            dispatch(getStockSuccess(date, null));
          } else {
            dispatch(getStockSuccess(date, json.datatable.data));
          }
        })
        .catch(() => {
          dispatch(() => {});
        });
    }
  };
}
