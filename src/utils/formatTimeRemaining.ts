import { dateSetTimezone } from './dateSetTimezone'

interface TimeRemaining {
  months?: number
  weeks?: number
  days?: number
  hours?: number
  minutes?: number
  seconds?: number
  milliseconds?: number
}

export function formatTimeRemaining(deadline: Date): string {
  const now = new Date()

  let remaining = dateSetTimezone(deadline) - now.getTime()

  if (remaining <= 0) {
    return 'Сроки истекли'
  }

  const millisecondsInSecond = 1000
  const millisecondsInMinute = millisecondsInSecond * 60
  const millisecondsInHour = millisecondsInMinute * 60
  const millisecondsInDay = millisecondsInHour * 24
  const millisecondsInWeek = millisecondsInDay * 7
  const millisecondsInMonth = millisecondsInDay * 30

  const time: TimeRemaining = {}

  time.months = Math.floor(remaining / millisecondsInMonth)
  remaining %= millisecondsInMonth

  time.weeks = Math.floor(remaining / millisecondsInWeek)
  remaining %= millisecondsInWeek

  time.days = Math.floor(remaining / millisecondsInDay)
  remaining %= millisecondsInDay

  time.hours = Math.floor(remaining / millisecondsInHour)
  remaining %= millisecondsInHour

  time.minutes = Math.floor(remaining / millisecondsInMinute)
  remaining %= millisecondsInMinute

  time.seconds = Math.floor(remaining / millisecondsInSecond)
  remaining %= millisecondsInSecond

  time.milliseconds = remaining

  if (time.months > 0) {
    return `${time.months} ${pluralize(time.months, [
      'месяц',
      'месяца',
      'месяцев'
    ])}, ${time.weeks} ${pluralize(time.weeks, ['неделя', 'недели', 'недель'])}`
  } else if (time.weeks > 0) {
    return `${time.weeks} ${pluralize(time.weeks, [
      'неделя',
      'недели',
      'недель'
    ])}, ${time.days} ${pluralize(time.days, ['день', 'дня', 'дней'])}`
  } else if (time.days > 0) {
    return `${time.days} ${pluralize(time.days, ['день', 'дня', 'дней'])}, ${
      time.hours
    } ${pluralize(time.hours, ['час', 'часа', 'часов'])}`
  } else if (time.hours > 0) {
    return `${time.hours} ${pluralize(time.hours, ['час', 'часа', 'часов'])}, ${
      time.minutes
    } ${pluralize(time.minutes, ['минута', 'минуты', 'минут'])}, ${
      time.seconds
    } ${pluralize(time.seconds, ['секунда', 'секунды', 'секунд'])}`
  } else if (time.minutes > 0) {
    return `${time.minutes} ${pluralize(time.minutes, [
      'минута',
      'минуты',
      'минут'
    ])}, ${time.seconds} ${pluralize(time.seconds, [
      'секунда',
      'секунды',
      'секунд'
    ])}`
  } else {
    return `${time.seconds} ${pluralize(time.seconds, [
      'секунда',
      'секунды',
      'секунд'
    ])} ${time.milliseconds} ${pluralize(time.milliseconds, [
      'миллисекунда',
      'миллисекунды',
      'миллисекунд'
    ])}`
  }
}

function pluralize(n: number, forms: [string, string, string]): string {
  n = Math.abs(n) % 100
  const n1 = n % 10
  if (n > 10 && n < 20) return forms[2]
  if (n1 > 1 && n1 < 5) return forms[1]
  if (n1 === 1) return forms[0]
  return forms[2]
}
