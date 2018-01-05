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

export function getStockData(page) {
  return async dispatch => {
    try {
      dispatch(getRequest());

      let dataObj = {};

      await fetch(``)
        .then(response => {
          if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
          }
          return response.json();
        })
        .then(json => {
          dataObj = json.results;
          return json.results;
        })
        .catch(error => {
          dispatch(getFailure(error));
        });

      dispatch(getSuccess(dataObj));
    } catch (e) {
      console.log(e);
    }
  };
}
