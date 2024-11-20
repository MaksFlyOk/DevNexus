import { MemberType } from '@types'
import { MemberCard } from '@ui'

interface MemberListDataProps {
  memberListData: MemberType[]
}

export const MemberList = ({ memberListData }: MemberListDataProps) => {
  return (
    <div className='row'>
      <div className='sticky-top pt-3 bg-light-subtle'>
        <h4 className='mb-2'>Участники</h4>
        <form action='' className='mb-3'>
          <input
            className='form-control form-control-lg'
            type='text'
            placeholder='Найти участника'
            aria-label='Поле "Найти участника"'
          />
        </form>
      </div>
      <div>
        {memberListData.map((member, iter: number) => {
          return (
            <MemberCard
              name={member.name}
              img={member.img}
              tags={member.tags}
              key={'User card ' + iter}
            />
          )
        })}
      </div>
    </div>
  )
}
