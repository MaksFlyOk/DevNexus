export const dateSetTimezone = (date: Date) => {
  return date.getTime() + date.getTimezoneOffset() * 60 * 1000
}
