import { AccentColorsType } from '@types'
import { convertBgColor } from '@utils/convertBgColor'
import './Tag.scss'

interface TagProps {
  tagName: string
  color: AccentColorsType
}

export const Tag = ({ tagName, color }: TagProps) => {
  return (
    <span className={'badge mw-100 ' + convertBgColor(color) + ' tagName'}>
      {tagName}
    </span>
  )
}
