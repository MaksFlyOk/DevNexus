import { TagType } from '@types'
import { convertBadgeColor } from '@utils'
import './Tag.scss'

export const Tag = ({ tagText, color }: TagType) => {
  return (
    <span className={'badge mw-100 ' + convertBadgeColor(color) + ' tagText'}>
      {tagText}
    </span>
  )
}
