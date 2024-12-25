import { TagType } from '@types'
import { convertBgColor } from '@utils/convertBgColor'
import './Tag.scss'

export const Tag = ({ tagText, color }: TagType) => {
  return (
    <span className={'badge mw-100 ' + convertBgColor(color) + ' tagText'}>
      {tagText}
    </span>
  )
}
