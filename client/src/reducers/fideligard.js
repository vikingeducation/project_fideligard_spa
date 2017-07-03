import { combineReducers } from 'redux'
import { dates } from './dates'
import { stocks } from './stocks'
import { trade } from './trade'
import { account } from './account'
import { transactions } from './transactions'

const fideligard = combineReducers({
  dates,
  stocks,
  trade,
  account,
  transactions
})

export default fideligard
