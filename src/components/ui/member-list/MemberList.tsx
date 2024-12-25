import { useGetMembers } from '@hooks/queries'
import { MemberCard, Spinner } from '@ui'

interface MemberListDataProps {
  memberListId: number
}

export const MemberList = ({ memberListId }: MemberListDataProps) => {
  const {
    isPending,
    isError,
    data: memberListData
  } = useGetMembers(memberListId)

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
        {isPending ? (
          <Spinner />
        ) : isError ? (
          <div className='d-flex justify-content-center py-3'>
            <h1>
              <span className='badge text-bg-danger'>Error</span>
            </h1>
          </div>
        ) : (
          memberListData.map((member, iter: number) => (
            <MemberCard
              name={member.name}
              img={member.img}
              tags={member.tags}
              key={'User card ' + iter}
            />
          ))
        )}
      </div>
    </div>
  )
}
