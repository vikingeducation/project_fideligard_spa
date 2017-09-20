import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import * as reducers from './reducers';

console.log(reducers)

export default () =>
	createStore(combineReducers({ ...reducers }), applyMiddleware(thunk));
