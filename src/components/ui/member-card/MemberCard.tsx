import { MemberType } from '@types'
import { CircleImg, Tag } from '@ui'
import './MemberCard.scss'

export const MemberCard = ({ name, img, tags }: MemberType) => {
  return (
    <div className='card p-2 my-2'>
      <div className='userCardHeader'>
        <div>
          <CircleImg img={img} alt={name + ' img'} />
        </div>
        <h5 className='userName'>{name}</h5>
      </div>
      <div className='d-flex flex-wrap gap-2'>
        {tags.map((tag, iter) => (
          <Tag
            tagText={tag.tagText}
            color={tag.color}
            key={name + ' tag ' + iter}
          />
        ))}
      </div>
    </div>
  )
}
