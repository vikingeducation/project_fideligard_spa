import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import Reducers from './containers/App/reducers';
console.log(Reducers);
export default () =>
	createStore(combineReducers(Reducers), applyMiddleware(thunk));
