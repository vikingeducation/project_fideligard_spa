import { combineReducers } from 'redux'
import { dates } from './dates'
import { stocks } from './stocks'
import { trade } from './trade'
import { account } from './account'
import { transactions } from './transactions'
import { portfolio } from './portfolio'

const fideligard = combineReducers({
  dates,
  stocks,
  trade,
  account,
  transactions,
  portfolio
})

export default fideligard
