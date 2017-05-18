import moment from 'moment';

export const FETCH_STOCKS_SUCCESS = "FETCH_STOCKS_SUCCESS";
export const FETCH_STOCKS_REQUEST = "FETCH_STOCKS_REQUEST";
export const FETCH_STOCKS_FAILURE = "FETCH_STOCKS_FAILURE";


export function fetchStocksSuccess(data) {
    return {
        type: FETCH_STOCKS_SUCCESS,
        data
    };
}

export function fetchStocksFailure(error) {
    return {
        type: FETCH_STOCKS_FAILURE,
        error
    };
}

export function fetchStocksRequest() {
    return {
        type: FETCH_STOCKS_REQUEST
    };
}


export function fetchStocks(date) {
    date = date ? date : moment().subtract(1, 'day').format('YYYYMMDD');
    return (dispatch) => {
        dispatch(fetchStocksRequest());
        
        fetch(`api/quandl/stocks/${date}`)
        .then(checkStatus)
        .then((json) => {
            dispatch(fetchStocksSuccess(json));
        })
        .catch((error) => {
            dispatch(fetchStocksFailure(error.message + error.response));
        });
        
    };
}





function checkStatus(response) {
    // If response not okay, throw an error
    if (!response.ok) {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
    return response.json();
}