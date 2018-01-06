import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import AppContainer from './containers/AppContainer';
import registerServiceWorker from './registerServiceWorker';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { fideligardApp } from './reducers/main_reducer';

const store = createStore(fideligardApp, applyMiddleware(ReduxThunk));

store.subscribe(() => console.log(store.getState()));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AppContainer />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
