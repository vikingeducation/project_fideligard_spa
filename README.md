https://fideligard-stocks.herokuapp.com/
# Fideligard Historical Portfolio Simulator

A tool which allows to test the performance of historical portfolios of stocks.
You can see information about stocks on your selected dates, perform trades, see all you transactions, and your portfolio for a specific day.
* Implemented back-end with Express to perform API queries to Quandl while safely hiding my API key secret.
* Built a React single-page app with multiple routes and components.
* Handled API calls that populated historical data and then displayed that data in a "Stocks" panel based on whichever date had been selected by the user.
* Accounted for API data holes (for example, Saturday and Sunday) and did calculations accordingly.
* Implemented trade functionality for any stock with a historical price on a selected date.
* Pulled all information together and used it to display transactions and portfolio.

## Getting Started

You can clone it and test it on your machine! You have to have the server (run nodemon server.js or node server.js inside server directory) and client side (run npm start inside client directory) running.


## Built With

* [QuandlAPI](https://blog.quandl.com/) - API to get historical stock data
* [React] - front-end library to build single-page app
* [Node, Express] - back-end
* [Bootstrap] - styling

## Deployment
https://fideligard-stocks.herokuapp.com/ - front-end React app
https://fideligard-server.herokuapp.com/ - server

## Authors

* **Egle Libby** - (https://github.com/eglital)
