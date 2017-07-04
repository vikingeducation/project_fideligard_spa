import React from 'react'

const Table = ({ children, classes }) => {
  classes = classes || ''
  return (
    <table className={`table table-hover ${classes}`}>
    {children}
    </table>
  )
}

export default Table
