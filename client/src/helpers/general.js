import React from 'react'

export function numDisplay(num) {
  if (isNaN(num)) {
    return '-'
  }
  return num < 0 ? '-$' + num.toFixed(2).slice(1) : '$' + num.toFixed(2)
}
