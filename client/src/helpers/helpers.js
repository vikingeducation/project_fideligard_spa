import React from 'react'

export function numDisplay(num) {
  if (isNaN(num)) {
    return '-'
  }
  return num < 0 ? '-$' + num.toFixed(2).slice(1) : '$' + num.toFixed(2)
}

export function dateToString(time) {
  const date = new Date(time)
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return date.getFullYear() + '-' + month + '-' + day
}
