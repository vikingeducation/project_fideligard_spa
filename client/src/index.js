import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './containers/App';

import configureStore from './store';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// <Route path="/stocks" component={Stocks} />

// <Route path="/dashboard" component={Dashboard}

const app = (
	<Provider store={configureStore()}>
		<Router>
			<div>
				<Route path="/" component={App} />
			</div>
		</Router>
	</Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
