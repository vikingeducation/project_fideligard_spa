import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import { createStore, applyMiddleware } from "redux";
import { stockAppReducer } from "./reducers/index";
import { Provider } from "react-redux";

import thunk from "redux-thunk";

let store = createStore(stockAppReducer, applyMiddleware(thunk));
let unsubscribe = store.subscribe(() => {
  console.log("state", store.getState());
});

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById("root")
);
