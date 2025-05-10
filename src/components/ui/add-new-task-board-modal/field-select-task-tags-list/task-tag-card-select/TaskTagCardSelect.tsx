import { AccentColorsType } from '@types'
import { Tag } from '@ui'

interface TaskTagSelectProps {
  tagName: string
  color: AccentColorsType
}

export const TaskTagCardSelect = ({ tagName, color }: TaskTagSelectProps) => {
  return (
    <div className='card p-2 position-relative'>
      <Tag color={color} tagName={tagName} />
    </div>
  )
}
