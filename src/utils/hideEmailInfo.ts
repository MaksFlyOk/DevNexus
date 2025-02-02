export const hideEmailInfo = (text: string) => {
  const indexAtMark = text.indexOf('@')

  return (
    '*'.repeat(text.substring(0, indexAtMark).length) +
    text.substring(indexAtMark, text.length)
  )
}
