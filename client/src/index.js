import React from "react";
import ReactDOM from "react-dom";
import "react-datepicker/dist/react-datepicker.css";
import "semantic-ui-css/semantic.min.css";
import "./index.css";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
// import { createStore } from "redux";
//import { Provider } from "react-redux"

// const store = createStore(REDUCER, {});

ReactDOM.render(
  // <Provider store={store}>
  <App />,
  // {/* </Provider>, */}
  document.getElementById("root")
);
registerServiceWorker();
