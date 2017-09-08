import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import App from './containers/App';

render(
	<Provider store={configureStore()}>
		<App />
	</Provider>,
	document.getElementById('root')
);

registerServiceWorker();
