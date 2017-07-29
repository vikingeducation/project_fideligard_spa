# Project Fideligard

[![Project Fideligard](http://i.imgur.com/N1OweUa.png)](https://pure-dawn-86561.herokuapp.com/)

## Introduction
Project Fideligard is a historical stock portfolio simulator. It leverages Quandl's stock API to provide End-of-Day stock prices.

## Technologies Used
Express is used in the back-end to provide a customized API for the client. The front-end is built entirely in React/Redux and uses react-router to provide navigation between different sections of the application. Please view the "Additional Notes" section at the end of this readme for some information regarding the implementation.

## Getting Started
For setting up a local version of the project, first clone the repository to your local machine. Then, install the dependencies using `yarn` or `npm install`. You will need to obtain a (free) Quandl API key from [their website.](https://www.quandl.com/) Then, set up an environment variable (preferably by creating a .env file inside the root directory) and setting your API key in the following manner:

```
QUANDL_API_KEY=YOUR_SECRET_KEY_HERE
```

If you would like to change the minimum date for stock data, simply change the appropriate static variables located in the `DatePicker.js` component. You will need to manually calculate the Unix timestamp for your chosen date.

Finally, simply run `yarn start`/`npm start` to get the application running.

## Deployment Link
A deployed version of this project may be found [here.](https://pure-dawn-86561.herokuapp.com/)

## Additional Notes
Of interest is the helpers.js file in the root directory, which is used to help the back-end manually construct the API from the data provided by Quandl.

Quandl's API returns data in a largely unhelpful format (a giant array of individual stock prices sorted alphabetically and by date). I created several helpful iterators to sort through the data. Since End-of-Day prices are not available for weekends, I also created some helpful functions to deal with these cases. If a user provides a weekend as a date, the API automatically converts this by looking backwards to find the most recent weekday date. 

To deal with parsing these dates, I used the js-joda library. Although Moment.js is frequently used for date parsing within the Node.js world, Moment.js provides a thin wrapper around JavaScript's built-in mutable Date library. js-joda is a a fast and immutable library which proved to be a very pleasant alternative to the common options. 

This helpers.js file uses js-joda extensively to parse all the dates. In addition to ensuring that the user provided date is not a weekend, it also ensures that the 1 day/7 day/30 day lookback dates are also not weekends.

On the front end, some significant details to note are the date-picker component. Built from the ground up, you can edit the date manually by simply clicking on the date itself. Clicking away automatically cancels the input using the `onBlur` event listener. 

The project uses cookies to persist the state of your portfolio. The trade form will automatically reject trades when the user does not have enough balance/stock to make a transaction. There are many sortable fields in the different tables. Sorting/searching results can be saved for the transactions table using url query strings. 
