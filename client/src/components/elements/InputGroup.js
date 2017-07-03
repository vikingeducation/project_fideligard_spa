import React from 'react'

const InputGroup = ({ name, text, children, classes }) => {

  classes = classes || "col-form-label col-md-3"

  return (
    <div className="row mb-2">
  <label htmlFor={name} className={classes}>
  {text}
  </label>
  <div className="col">
  {children}
  </div>
  </div>
  )
}

export default InputGroup
