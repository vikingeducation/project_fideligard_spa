import React, { Component } from 'react'

const Input = ({ type, name, classes, ...rest }) => {

  type = type || 'text'
  classes = classes || null

  return (
    <input type={type} name={name} className={`form-control ${classes}`}  {...rest} />
  )

}



export default Input
