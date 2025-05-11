import { useAddGroup } from '@hooks/mutations'
import { useActions, useTypedSelector } from '@hooks/redux-hooks'
import DefaultCircleImg from '@images/DefaultCircleImg.svg'
import { UserProfileType } from '@types'
import { Modal, Spinner } from '@ui'
import { useState } from 'react'
import { AddNewGroupModal } from './addNewGroupModal'

interface GroupListProps {
  isUserPending: boolean
  isUserError: boolean
  userData: UserProfileType | undefined
}

export const GroupList = ({
  isUserPending,
  isUserError,
  userData
}: GroupListProps) => {
  const { setGroupId } = useActions()

  const { groupId } = useTypedSelector(state => state.groupState)

  const [isShow, setIsShow] = useState(false)

  const { mutateAsync, isPending: mutateIsPending } = useAddGroup()

  return (
    <div className='d-flex flex-column py-3 gap-1'>
      <Modal isShow={isShow} setIsShow={setIsShow}>
        <AddNewGroupModal
          setIsShow={setIsShow}
          addNewGroupMutation={mutateAsync}
        />
      </Modal>
      <button
        type='button'
        disabled={mutateIsPending}
        className='btn btn-primary rounded-circle'
        style={{ width: '100%', height: '100%', aspectRatio: 1 }}
        onClick={() => setIsShow(true)}
      >
        {mutateIsPending ? <Spinner /> : <p className='h1'>+</p>}
      </button>
      {isUserPending ? (
        <Spinner />
      ) : isUserError ? (
        <div className='d-flex justify-content-center py-3'>
          <h1>
            <span className='badge text-bg-danger'>Error</span>
          </h1>
        </div>
      ) : (
        userData?.groups.map((group, iter: number) => (
          <button
            key={'Group img ' + iter}
            type='button'
            className={`btn rounded-circle p-0 ${
              group.group_uuid === groupId ? 'border-primary border-3' : ''
            }`}
            onClick={() =>
              setGroupId(
                group.group_uuid === groupId ? undefined : group.group_uuid
              )
            }
          >
            <div className='d-flex justify-content-center rounded-circle'>
              <img
                draggable={false}
                className='w-100'
                src={group?.icon ? group?.icon : DefaultCircleImg}
                alt={'Group image ' + group.id}
              />
            </div>
          </button>
        ))
      )}
    </div>
  )
}
