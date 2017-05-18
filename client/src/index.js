import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { date } from "./reducers/dateReducer";
import { Provider } from "react-redux";
import { stocks } from "./reducers/stocksReducer";
import thunk from "redux-thunk";

let stockAppReducer = combineReducers({ date, stocks });

let store = createStore(stockAppReducer, applyMiddleware(thunk));
let unsubscribe = store.subscribe(() => {
  console.log("state", store.getState());
});

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById("root")
);
