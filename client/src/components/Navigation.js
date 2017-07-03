import React from 'react'
import Select from './elements/Select'
import Form from './Form'

const Navigation = ({ history }) => {

  function updateRoute(e) {
    history.push(e.target.value)
  }

  let path = history.location.pathname

  return (
    <Form onChange={updateRoute} className="float-right form-inline">
  <Select defaultValue={path}>
  <option value="/trade">Trade</option>
  <option value="/portfolio">Portfolio</option>
  <option value="/transactions">Transactions</option>
  </Select>
  </Form>

  )
}

export default Navigation
