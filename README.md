# project_fideligard_spa
Buy low, sell high.

Now...
  1. have a default panel of stocks -> 
      pick 12 random stocks and make these the default watchlist when you load the page
  2. create actions -> reducers (use swapi project for help setting up)
    that will update stocks state with api info
  3. create table component
  4. enable filtering via ticker
  5. when we start adding transactions, we can add our stock to the stock watchlist


  TRICKY: HOW DO WE SET UP FILTER?
    -"Filter/Reset Buttons"
    -Upon "filtering", we add it to watchlist, make api request, THEN we filter"
    -Upon reset, we set stockFilter back to null value
initialState: {
  stockFilter: "",
  stockWatchlist: [...defaultStocks],
  stockData: apiResults,
  date: datePicker
}

getInitialStockData("a,b,c,d")