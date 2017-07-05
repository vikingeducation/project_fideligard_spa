export function msToDateString(time) {
  const date = new Date(time)
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return date.getFullYear() + '-' + month + '-' + day
}

// export function getQueryDates(start) {
//   return [getDaysAgo(start), getDaysAgo(start, 1), getDaysAgo(start, 7), getDaysAgo(start, 30)]
// }

export function datesToQueryString(dates) {
  return dates.join(',').replace(/-/g, '')
}

export function getDaysAgo(start, difference) {
  // returns a weekday
  difference = difference || 0
  let day = 86400000
  let date = new Date(new Date(start) - (difference * day))
  let dayOfWeek = date.getUTCDay()
  if (dayOfWeek === 6) {
    date = new Date(date - (1 * day))
  } else if (dayOfWeek === 0) {
    date = new Date(date - (2 * day))
  }
  return msToDateString(date)
}
