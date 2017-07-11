# project_fideligard_spa
Buy low, sell high.

Now...
  1. input box with two buttons = Filter/Reset
  2. onSubmit =>
      -add filter to watchlist
      -change table building so that it also reacts (GOTCHA) to filter
      -then call getStocks with [...this.props.stockWatchlist, filter]
      -reset will clear the filter (sets to null or empty string or whatever);