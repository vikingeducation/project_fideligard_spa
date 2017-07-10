# project_fideligard_spa
Buy low, sell high.

Our external endpoint:
https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?api_key=YOUR_KEY&qopts.columns=ticker,date,close&date.gte=DATE&date.lte=DATE&ticker=SYMBOLS

Stocks data panel?
What do we need?
An API that returns a JSON object like this, separated by symbols requested:
{
  results: {
    A: {
      one_day_ago: [
                "A",
                "2017-06-07",
                60.26,
                60.765,
                59.98,
                60.63,
                1617504,
                0,
                1,
                60.125025453065,
                60.628894318876,
                59.845652616575,
                60.494196701283,
                1617504
            ],
      seven_days_ago: [
                "A",
                "2017-06-07",
                60.26,
                60.765,
                59.98,
                60.63,
                1617504,
                0,
                1,
                60.125025453065,
                60.628894318876,
                59.845652616575,
                60.494196701283,
                1617504
            ],
        etc.
    }
  }
}

So we build an endpoint that does this:
1. Takes an end date, calculates a start-date 35ish(?) days away using jsjoda, and takes symbols (required)?
2. queries external API
3. parses the information by iterating through datatables.data
  - for each symbol in query:
    - Get today price
    - get 1 day price, if 1 day ago is sat -or- sun, get previous friday price
    - get 7 day price, if 7 days ago is sat -or- sun, get previous friday price
    etc.
    - if no price available for that day, go back a day and make sure it's not a weekend
4. return results to user.