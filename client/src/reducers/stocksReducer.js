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





function stocks(state = {}, action) {
    switch (action.type){
        case FETCH_STOCKS_REQUEST: 
            return {
                ...state,
                isFetching: true,
                error: null
            }
        case FETCH_STOCKS_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.error
            }
        default:
            return state;
    }
    
    
}