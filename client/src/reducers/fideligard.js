import { combineReducers } from 'redux'
import { dates } from './dates'
import { stocks } from './stocks'

const fideligard = combineReducers({
  dates,
  stocks
})

export default fideligard
