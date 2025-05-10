export const hideEmailInfo = (text: string) => {
  const indexAtMark = text.indexOf('@')
  const indexAtDot = text.indexOf('.')

  return (
    '*'.repeat(text.substring(0, indexAtMark).length) +
    '@' +
    '*'.repeat(text.substring(indexAtMark + 1, indexAtDot).length) +
    text.substring(indexAtDot, text.length)
  )
}
