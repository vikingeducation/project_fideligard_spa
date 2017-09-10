import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";

//REACT-REDUX
import { Provider } from "react-redux";

//REDUX
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import stocks from "./reducers/stocks";
const Reducers = { stocks };
const store = createStore(combineReducers(Reducers), applyMiddleware(thunk));
console.log("store = ", store);
console.log("store.getState() = ", store.getState());

//TODO: add provider here later
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
