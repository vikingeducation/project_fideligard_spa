import React from 'react'
import Select from './elements/Select'

const Navigation = ({ history }) => {

  function updateRoute(e) {
    history.push(e.target.value)
  }

  let path = history.location.pathname
  return (
    <form onChange={updateRoute} className="float-right form-inline">
  <Select defaultValue={path}>
  <option value="/trade">Trade</option>
  <option value="/portfolio">Portfolio</option>
  <option value="/transactions">Transactions</option>
  </Select>
  </form>

  )
}

export default Navigation
