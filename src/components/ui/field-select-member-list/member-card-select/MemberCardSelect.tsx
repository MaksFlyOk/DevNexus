import { UserType } from '@types'
import { Tag } from '@ui/tag'

interface MemberCardSelectProps {
  name: UserType['username']
  tags: UserType['tags']
}

export const MemberCardSelect = ({ name, tags }: MemberCardSelectProps) => {
  return (
    <div className='card p-2 position-relative'>
      <h5 className='w-auto text-wrap'>{name}</h5>
      <div className='d-flex flex-wrap gap-2'>
        {tags.map(tag => (
          <Tag
            tagName={tag.name}
            color={tag.color}
            key={`User tag ${tag.code}`}
          />
        ))}
      </div>
    </div>
  )
}
