export function formatDateToString(date: Date) {
  var year = date.getFullYear()
  var month = String(date.getMonth() + 1).padStart(2, '0')
  var day = String(date.getDate()).padStart(2, '0')

  return year + '-' + month + '-' + day
}

export function formatStringToDate(dateString: string) {
  var parts = dateString.split('-')
  var year = parseInt(parts[0], 10)
  var month = parseInt(parts[1], 10) - 1
  var day = parseInt(parts[2], 10)

  return new Date(year, month, day)
}
