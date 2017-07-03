import { combineReducers } from 'redux'
import { dates } from './dates'
import { stocks } from './stocks'
import { trade } from './trade'
import { account } from './account'

const fideligard = combineReducers({
  dates,
  stocks,
  trade,
  account
})

export default fideligard
