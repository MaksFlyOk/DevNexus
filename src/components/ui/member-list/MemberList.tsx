import { useAddMemberGroup } from '@hooks/mutations'
import { useActions } from '@hooks/redux-hooks'
import { useMembersSearch } from '@hooks/useMembersSearch'
import { GroupType } from '@types'
import { MemberCard, Modal, Spinner } from '@ui'
import { SetStateAction, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AddUserGroupModal } from './AddUserGroupModal'
import './MemberList.scss'

interface MemberListProps {
  isGroupPending: boolean
  isGroupError: boolean
  groupData: GroupType | undefined
}

export const MemberList = ({
  isGroupPending,
  isGroupError,
  groupData
}: MemberListProps) => {
  const { setInitialMemberListState } = useActions()
  const [isShow, setIsShow] = useState(false)
  const navigate = useNavigate()
  const [inputValue, setInputValue] = useState('')

  const searchMembersFunction = useMembersSearch()

  const handleInputChange = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setInputValue(event.target.value)
  }

  useEffect(() => {
    if (!isGroupPending && groupData) {
      setInitialMemberListState(groupData.members)
    }
  }, [isGroupPending, groupData])

  const { mutateAsync, isPending: mutateIsPending } = useAddMemberGroup()

  return (
    <div className='row'>
      <Modal isShow={isShow} setIsShow={setIsShow}>
        <AddUserGroupModal
          setIsShow={setIsShow}
          addUserMutation={mutateAsync}
        />
      </Modal>
      <div className='sticky-top pt-3 bg-light-subtle px-2'>
        <h4 className='mb-2 px-1'>Участники</h4>
        <form action='' className='mb-3'>
          <div className='input-group'>
            <input
              className='form-control form-control-lg'
              type='text'
              placeholder='Найти участника'
              aria-label='Поле "Найти участника"'
              disabled={isGroupPending || isGroupError}
              value={inputValue}
              onChange={handleInputChange}
              id='autoSizingInputGroup'
            />
            <div className='cross input-group-text'>
              <button
                className='clear-member-search-input'
                type='button'
                onClick={() => setInputValue('')}
              >
                &#65794;
              </button>
            </div>
          </div>
        </form>
      </div>
      <div>
        {isGroupPending ? (
          <Spinner />
        ) : isGroupError ? (
          <div className='d-flex justify-content-center py-3'>
            <h1>
              <span className='badge text-bg-danger'>Error</span>
            </h1>
          </div>
        ) : (
          <>
            <button
              type='button'
              className='btn btn-primary w-100'
              disabled={mutateIsPending}
              onClick={() => setIsShow(true)}
            >
              {mutateIsPending ? <Spinner /> : <p className='h1'>+</p>}
            </button>
            {inputValue === '' ? (
              <>
                {groupData?.members.map((member, iter: number) => (
                  <div
                    className='user-card-pointer'
                    onClick={() => navigate(`/user-profile/${member.username}`)}
                    key={'User card ' + iter}
                  >
                    <MemberCard
                      name={
                        groupData.admin.username === member.username &&
                        groupData.admin.email === member.email
                          ? `${member.username} {Admin}`
                          : member.username
                      }
                    />
                  </div>
                ))}
              </>
            ) : (
              searchMembersFunction(inputValue, groupData?.members)
            )}
          </>
        )}
      </div>
    </div>
  )
}
