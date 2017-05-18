import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
//import { createStore, applyMiddleware } from "redux";
//import { Provider } from "react-redux";
//import thunk from "redux-thunk";
//import {} from "./reducers";

//let store = createStore(starWars, applyMiddleware(thunk));

ReactDOM.render(<App />, document.getElementById("root"));
