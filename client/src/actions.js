import { previousDate } from "./helpers/helper";
export const GET_TODAY_SUCCESS = "GET_TODAY_SUCCESS";
export const GET_YESTER_SUCCESS = "GET_YESTER_SUCCESS";
export const GET_WEEK_SUCCESS = "GET_WEEK_SUCCESS";
export const GET_MONTH_SUCCESS = "GET_MONTH_SUCCESS";
export const GET_REQUEST = "GET_REQUEST";
export const GET_REQUEST_FAILURE = "GET_REQUEST_FAILURE";
export const CLEAR_DATA = "CLEAR_DATA";

export function getRequest() {
  return {
    type: GET_REQUEST
  };
}

export function getTodaySuccess(data) {
  return {
    type: GET_TODAY_SUCCESS,
    data
  };
}

export function getYesterSuccess(data) {
  return {
    type: GET_YESTER_SUCCESS,
    data
  };
}

export function getWeekAgoSuccess(data) {
  return {
    type: GET_WEEK_SUCCESS,
    data
  };
}

export function getMonthAgoSuccess(data) {
  return {
    type: GET_MONTH_SUCCESS,
    data
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

export function getApiData(section, params, date, successCB) {
  return dispatch => {
    console.log("RequestDataCall", section, params, date);
    dispatch(getRequest());
    if (!section || !params || !date) {
      return {};
    }
    fetch(`${section}/${params}/${date}/`)
      .then(checkStatus)
      .then(json => {
        if (json.datatable.data.length < 1) {
          dispatch(
            getApiData(section, params, previousDate(date, 1), successCB)
          );
        } else {
          dispatch(successCB(json.datatable));
        }
      })
      .catch(error => {
        dispatch(getApiData(section, params, previousDate(date, 1), successCB));
      });
  };
}
