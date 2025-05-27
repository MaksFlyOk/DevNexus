import { AccentColorsType } from '@types'
import { convertBgColor } from '@utils/convertBgColor'
import './Tag.scss'

interface TagProps {
  tagName: string
  color: AccentColorsType | 'primary'
}

export const Tag = ({ tagName, color }: TagProps) => {
  return (
    <span
      className={'badge d-block mw-100 ' + convertBgColor(color) + ' tagName'}
    >
      {tagName}
    </span>
  )
}
