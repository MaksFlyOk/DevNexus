import { dateSetTimezone } from './dateSetTimezone'

export const dateISOtoLocalString = (ISOdateString: string) => {
  const date = new Date(ISOdateString)

  return new Date(dateSetTimezone(date)).toLocaleString('ru-ru', {
    weekday: 'short',
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}
