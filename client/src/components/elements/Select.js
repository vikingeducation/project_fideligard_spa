import React, { Component } from 'react'

const Select = ({ classes, options, children, ...rest }) => {

  classes = classes || ''

  if (!children && options) {
    children = options.map((option) => (
      <option value={option} key={option}>{option}</option>
    ))
  }

  return (
    <select className={`form-control ${classes}`} {...rest}>
    {children}
  </select>
  )
}

export default Select
