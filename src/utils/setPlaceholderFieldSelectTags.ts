import { AccentColorsType, TagType } from '@types'

export const setPlaceholderFieldSelectTags = (
  tagsArray: Array<
    | {
        tag_name: string
        tag_code: string
        tag_color: AccentColorsType
      }
    | TagType
  >
) => {
  let placeholder = ''

  tagsArray.forEach((tag, iter, arr) => {
    const tagName = 'tag_name' in tag ? tag.tag_name : tag.name
    if (iter !== arr.length - 1) {
      placeholder += tagName + ', '
    } else {
      placeholder += tagName
    }
  })

  return placeholder === '' ? 'Здесь пустовато' : placeholder
}
