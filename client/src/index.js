import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AppContainer from "./containers/AppContainer";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import FideligardApp from "./reducers";
import thunk from "redux-thunk";

store = createStore(FideligardApp, applyMiddleware(thunk));

app = () => {
	return (
		<Provider store={store}>
			<AppContainer />
		</Provider>
	);
};

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
