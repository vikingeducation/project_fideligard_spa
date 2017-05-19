// stock = {
//     Day0Price: Number,
//     Day1Price: Number,
//     Day7Price: Number,
//     Day30Price: Number,
//     Symbol: ""
// }

// stocks = {
//     date: "",
//     stocks: [],
//     error: null,
//     isFetching: false
// };
import {
    FETCH_STOCKS_SUCCESS,
    FETCH_STOCKS_REQUEST,
    FETCH_STOCKS_FAILURE,
    SET_STOCKS_FILTER
} from "../actions/stocksAction";

const initialState = {
    data: [],
    error: null,
    isFetching: false,
    filter: ""
};

export function stocks(state = initialState, action) {
    switch (action.type) {
        case FETCH_STOCKS_REQUEST:
            return {
                ...state,
                isFetching: true,
                error: null
            };
        case FETCH_STOCKS_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.error
            };
        case FETCH_STOCKS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.data.stocks
            };
        case SET_STOCKS_FILTER:
            return {
                ...state,
                filter: action.data
            };
        default:
            return state;
    }
}
