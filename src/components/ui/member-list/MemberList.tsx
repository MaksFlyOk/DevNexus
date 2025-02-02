import { useGetMembers } from '@hooks/queries'
import { MemberCard, Spinner } from '@ui'
import { SetStateAction, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMembersSearch } from './useMembersSearch'

interface MemberListDataProps {
  memberListId: number
}

export const MemberList = ({ memberListId }: MemberListDataProps) => {
  const {
    isPending,
    isError,
    data: memberListData
  } = useGetMembers(memberListId)

  const navigate = useNavigate()

  const [inputValue, setInputValue] = useState('')

  const searchMembersFunction = useMembersSearch()

  const handleInputChange = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setInputValue(event.target.value)
  }

  return (
    <div className='row'>
      <div className='sticky-top pt-3 bg-light-subtle'>
        <h4 className='mb-2'>Участники</h4>
        <form action='' className='mb-3'>
          <div className='input-group'>
            <input
              className='form-control form-control-lg'
              type='text'
              placeholder='Найти участника'
              aria-label='Поле "Найти участника"'
              disabled={isPending}
              value={inputValue}
              onChange={handleInputChange}
              id='autoSizingInputGroup'
            />
            <div
              className='cross input-group-text pointer-event'
              style={{ cursor: 'pointer' }}
              onClick={() => setInputValue('')}
            >
              <span aria-hidden='true'>&#65794;</span>
            </div>
          </div>
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
        ) : inputValue === '' ? (
          memberListData.map((member, iter: number) => (
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/user-profile/${member.id}`)}
              key={'User card ' + iter}
            >
              <MemberCard
                name={member.name}
                img={member.img}
                tags={member.tags}
              />
            </div>
          ))
        ) : (
          searchMembersFunction(inputValue, memberListData)
        )}
      </div>
    </div>
  )
}
