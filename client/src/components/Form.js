import React from 'react'
const Form = ({ children, classes, inline, ...rest }) => {
  inline = inline ? 'form-inline ' : ''
  classes = classes || ''
  return (
    <form className={`${inline} ${classes}`} {...rest}>
  {children}
  </form>
  )
}

export default Form
