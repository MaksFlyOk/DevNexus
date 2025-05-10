import { CircleImg } from '@ui'
import './MemberCard.scss'

interface MemberCardProps {
  name: string
  img?: string
}

export const MemberCard = ({ name, img }: MemberCardProps) => {
  return (
    <div className='card p-2 my-2'>
      <div className='userCardHeader'>
        <CircleImg img={img} alt={name + ' img'} />
        <h4 className='userName'>{name}</h4>
      </div>
    </div>
  )
}
