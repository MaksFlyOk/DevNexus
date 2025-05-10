import { $axios } from '@axios'
import { useActions } from '@hooks/redux-hooks'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { GroupType } from '@types'
import { CircleImg } from '@ui/circle-img'
import { MemberList } from '@ui/member-list'
import { Spinner } from '@ui/spinner'
import { Dispatch, SetStateAction, useState } from 'react'

interface AddGroupBoardModalProps {
  setIsShow: Dispatch<SetStateAction<boolean>>
  isGroupPending: boolean
  isGroupError: boolean
  groupData: GroupType | undefined
}

export const BoardInfoModal = ({
  setIsShow,
  isGroupError,
  isGroupPending,
  groupData
}: AddGroupBoardModalProps) => {
  const { setGroupId } = useActions()
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => {
      return $axios.delete(`v1/group/${groupData?.group_uuid}/`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get user'] })
      setIsShow(false)
      setGroupId(undefined)
    }
  })

  const [danger, setDanger] = useState(false)

  return (
    <div className='modal-dialog modal-lg'>
      <div className='modal-content'>
        <div className='modal-header'>
          <h1 className='modal-title fs-5' id='exampleModalLabel'>
            {groupData?.name}
          </h1>
          <button
            type='button'
            className='btn-close'
            data-bs-dismiss='modal'
            aria-label='Закрыть'
            onClick={() => setIsShow(false)}
          ></button>
        </div>
        <div className='modal-body position-relative '>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '0.4fr 2fr'
            }}
          >
            <div>
              <CircleImg img={groupData?.icon} alt={groupData?.name + ' img'} />
            </div>
            <h5 className='mx-3 my-3'>{groupData?.description}</h5>
          </div>
          <div
            className='overflow-y-scroll overflow-x-hidden bg-light-subtle px-2 mt-2 rounded-3'
            style={{ height: '50vh' }}
          >
            <MemberList
              isGroupError={isGroupError}
              isGroupPending={isGroupPending}
              groupData={groupData}
            />
          </div>
        </div>
        <div className='modal-footer'>
          <div className='d-flex w-100 flex-column gap-2'>
            <h4 className='text-danger'>Danger-zone</h4>
            <button
              type='button'
              className='btn btn-outline-danger'
              onClick={() => (danger ? mutateAsync() : setDanger(true))}
              onMouseLeave={() => setDanger(false)}
            >
              {isPending ? <Spinner /> : danger ? `Confirm` : `Delete group`}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
