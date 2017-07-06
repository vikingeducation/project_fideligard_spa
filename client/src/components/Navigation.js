import React from 'react'
import { Form, Input } from 'reactstrap'

const Navigation = ({ history }) => {

  function updateRoute(e) {
    history.push(e.target.value)
  }

  let path = history.location.pathname

  return (
    <Form onChange={updateRoute} className="float-md-right ">
  <Input type="select" defaultValue={path}>
  <option value="/trade">Trade</option>
  <option value="/portfolio">Portfolio</option>
  <option value="/transactions">Transactions</option>
  </Input>
  </Form>

  )
}

export default Navigation
