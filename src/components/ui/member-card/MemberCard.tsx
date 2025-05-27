import { AccentColorsType, TagType } from '@types'
import { CircleImg, Tag } from '@ui'
import './MemberCard.scss'

type TagTypeWithPrimaryColor = Omit<TagType, 'color'> & {
  color: AccentColorsType | 'primary'
}

interface MemberCardProps {
  name: string
  img?: string
  tags: TagTypeWithPrimaryColor[]
}

export const MemberCard = ({ name, img, tags }: MemberCardProps) => {
  return (
    <div className='card p-2 my-2'>
      <div className='userCardHeader'>
        <CircleImg img={img} alt={name + ' img'} />
        <h4 className='userName'>{name}</h4>
      </div>
      <div className='d-flex flex-wrap gap-2 pt-2'>
        {tags.map(tag => (
          <Tag
            tagName={tag.name}
            color={tag.color}
            key={name + ' tag ' + tag.code}
          />
        ))}
      </div>
    </div>
  )
}
