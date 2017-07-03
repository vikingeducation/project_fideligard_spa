import React from 'react'

const SortIcon = ({ order }) => {
  return (
    <span>{order > 0 ? '▲' : '▼' }</span>
  )

}

export default SortIcon
