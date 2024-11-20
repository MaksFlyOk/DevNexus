import { GroupType } from '@types'
import { CircleImg } from '@ui'

interface GroupListDataProps {
  groupListData: GroupType[]
}

export const GroupList = ({ groupListData }: GroupListDataProps) => {
  return (
    <div className='d-flex flex-column py-3 gap-1'>
      {groupListData.map((group, iter: number) => (
        <CircleImg
          img={group?.img}
          alt={'Group img ' + iter}
          key={'Group img ' + iter}
        />
      ))}
    </div>
  )
}
